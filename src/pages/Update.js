import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../service';

function useLoginCheck(navigate) {
    useEffect(() => {
        if (localStorage.getItem('token') === null) navigate('../');
    }, [navigate])
}

function useCsrfToken() {
    const [csrfToken, setCsrfToken] = useState({}); // 불러온 CSRF 토큰 관리

    // 바로 실행
    useEffect(() => {
        if (localStorage.getItem('token') === null) return;
        service.getCsrfToken().then(
            (res) => {setCsrfToken(res.data.csrf_token);}
        )
    }, []) // 한 번만 실행

    return [csrfToken];
}

function useIsChecked() {
    const [isChecked, setIsChecked] = useState(false); // 비밀번호 확인 여부 반영

    useEffect(() => {
        if (localStorage.getItem('token') === null) return;
        setIsChecked(false);
    }, [])

    return [isChecked, setIsChecked];
}

export default function Update() {
    // 라우팅 부분
    const navigate = useNavigate();
    useLoginCheck(navigate);

    // 입력값 처리 부분
    const [csrfToken] = useCsrfToken();
    const [isChecked, setIsChecked] = useIsChecked();
    const [values, setValues] = useState({}) // 입력값 반영
    const [password, setPassword] = useState('') // 비밀번호 입력값 반영
    const passwordFocus = useRef(null); // 비밀번호 확인 참조
    const idFocus = useRef(null); // 아이디 참조
    const emailFocus = useRef(null) // 이메일 참조

    // 입력값이 변경될 때마다 자동으로 상태를 반영
    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }))
    }

    // 비밀번호 입력 상태 반영
    const handlePasswordChange = (e) => {
        const {name, value} = e.target;
        setPassword((prevValues) => ({
            ...prevValues,
            [name]: value
        }))
    }

    // 제출 처리 함수
    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!values.id || !values.email) {
            if (!values.id) {
                alert('아이디를 입력하세요.');
                idFocus.current.focus();
            } else {
                alert('이메일을 입력하세요.');
                emailFocus.current.focus();
            }

            return false
        }

        service.updateUser(values, csrfToken).then(
            (res) => {
                if (res.data.rs === 1) {
                    alert('정보가 변경되었습니다.')
                    navigate('../');
                }
            }
        )
    }
    
    // 비밀번호 확인 제출 처리 함수
    const handlePasswordSubmit = async(e) => {
        e.preventDefault();

        if (!password) {
            alert('비밀번호를 입력하세요.')
            passwordFocus.current.focus();

            return false
        }

        service.checkUser(password, csrfToken).then(
            (res) => {
                if (res.data.rs === 1) {
                    setPassword('');
                    setIsChecked(true);
                    
                    service.loadUpdateUser().then(
                        (res) => {
                            setValues((prevValues) => ({
                                ...prevValues,
                                id: res.data.id,
                                email: res.data.email
                            }))
                        }
                    )
                }
                else {
                    alert('비밀번호가 일치하지 않습니다.');
                    passwordFocus.current.focus();
                }
            }
        )
    }

    // 화면 출력 부분
    return (
        <div className='container-fluid container-xl'>
            <h1 className='pb-2 ms-3 my-3 border-bottom'>회원정보 수정</h1>
            {(isChecked) ? (
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='id'>아이디</label>
                        <input type='text' id='id' className='form-control' name='id' onChange={handleChange} value={values.id} ref={idFocus}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='pw'>비밀번호</label>
                        <input type='password' id='pw' className='form-control' name='pw' onChange={handleChange}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'>이메일</label>
                        <input type='email' id='email' className='form-control' name='email' onChange={handleChange} value={values.email} ref={emailFocus}></input>
                    </div>
                    <div>
                        <input type='submit' className='btn btn-secondary w-100 py-2' value={'수정하기'}></input>
                    </div>
                </form>
            ) : (
                <form onSubmit={handlePasswordSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='password'>비밀번호 확인</label>
                        <input type='password' id='password' name='password' className='form-control' onChange={handlePasswordChange} ref={passwordFocus}></input>
                    </div>
                    <div>
                        <input type='submit' className='btn btn-secondary w-100 py-2' value={'제출'}></input>
                    </div>
                </form>
            )}
        </div>
    );
}