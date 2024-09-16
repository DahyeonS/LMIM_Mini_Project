import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../service';

// 로그인 확인
function useLoginCheck(navigate) {
    useEffect(() => {
        if (!localStorage.getItem('token')) navigate('../'); // 비로그인 차단(페이지 이동)
    }, [navigate]) // 페이지가 로드될 때 한 번만 실행
}

// 비밀번호 확인
function useIsChecked() {
    const [isChecked, setIsChecked] = useState(false); // 비밀번호 확인 여부 반영

    useEffect(() => {
        if (!localStorage.getItem('token')) return; // 비로그인시 적용 X
        setIsChecked(false);
    }, []) // 페이지가 로드될 때 한 번만 실행

    return [isChecked, setIsChecked];
}

// 불러온 데이터 관리
function useCsrfToken() {
    const [csrfToken, setCsrfToken] = useState({}); // 불러온 CSRF 토큰 관리

    // 바로 실행
    useEffect(() => {
        if (!localStorage.getItem('token')) return; // 비로그인시 적용 X
        service.getCsrfToken().then(
            (res) => {setCsrfToken(res.data.csrf_token);} // CSRF 토큰 저장
        )
    }, []) // 페이지가 로드될 때 한 번만 실행

    return [csrfToken];
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

    // 입력값이 변경될 때마다 자동으로 상태를 갱신
    const handleChange = (e) => {
        const {name, value} = e.target; // 입력값의 name, value 추출
        setValues((prevValues) => ({
            ...prevValues, // 이전에 입력된 값을 복사
            [name]: value // 새로운 값을 추가하거나 갱신된 값을 적용
        }))
    }

    // 비밀번호 입력 상태 갱신
    const handlePasswordChange = (e) => {
        const {name, value} = e.target;
        setPassword((prevValues) => ({
            ...prevValues,
            [name]: value
        }))
    }

    // 제출 처리 함수
    const handleSubmit = async(e) => {
        e.preventDefault(); // 페이지 변경 방지

        // 빈 공간이 있을 시 전송 X
        if (!values.id || !values.email) {
            if (!values.id) {
                alert('아이디를 입력해주세요.');
                idFocus.current.focus(); // 아이디에 포커스
            } else {
                alert('이메일을 입력해주세요.');
                emailFocus.current.focus(); // 이메일에 포커스
            }

            return;
        }

        service.updateUser(values, csrfToken).then(
            (res) => {
                if (res.data.rs === 1) {
                    alert('정보가 변경되었습니다.')
                    navigate('../'); // 메인화면으로 이동
                }
            }
        )
    }
    
    // 비밀번호 확인 제출 처리 함수
    const handlePasswordSubmit = async(e) => {
        e.preventDefault(); // 페이지 변경 방지

        // 빈 공간이 있을 시 전송 X
        if (!password) {
            alert('비밀번호를 입력하세요.')
            passwordFocus.current.focus(); // 비밀번호에 포커스

            return;
        }

        service.checkUser(password, csrfToken).then(
            (res) => {
                if (res.data.rs === 1) { // 응답받은 값의 rs가 1일 때
                    setPassword(''); // 비밀번호 입력 초기화
                    setIsChecked(true); // 비밀번호 확인 성공
                    
                    service.loadUpdateUser().then(
                        (res) => {
                            setValues((prevValues) => ({
                                ...prevValues, // 이전에 입력된 값을 복사
                                id: res.data.id, // 아이디를 불러온 값으로 갱신
                                email: res.data.email // 이메일을 불러온 값으로 갱신
                            }))
                        }
                    )
                }
                else {
                    alert('비밀번호가 일치하지 않습니다.');
                    passwordFocus.current.focus(); // 비밀번호에 포커스
                }
            }
        )
    }

    // 화면 출력 부분
    return (
        <section className='container-fluid container-xl px-5'>
            <div className='pt-5 mb-5 border-bottom'>
                <h1 className='pt-5 text-secondary fw-bold fst-italic'>회원정보 수정</h1>
            </div>
            {isChecked ? // 회원정보 수정
                <form className='pb-5' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='id' className='mb-1 text-secondary'>아이디</label>
                        <input type='text' id='id' className='form-control' name='id' onChange={handleChange} value={values.id} ref={idFocus}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='pw' className='mb-1 text-secondary'>비밀번호</label>
                        <input type='password' id='pw' className='form-control' name='pw' onChange={handleChange}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email' className='mb-1 text-secondary'>이메일</label>
                        <input type='email' id='email' className='form-control' name='email' onChange={handleChange} value={values.email} ref={emailFocus}/>
                    </div>
                    <div>
                        <input type='submit' className='btn btn-primary w-100 py-2 mt-3 mb-5' value={'수정하기'}/>
                    </div>
                </form>
             : // 비밀번호 확인
                <form className='pb-5' onSubmit={handlePasswordSubmit}>
                    <label htmlFor='password' className='mb-1 text-secondary'>비밀번호 확인</label>
                    <input type='password' id='password' name='password' className='form-control' onChange={handlePasswordChange} ref={passwordFocus}/>
                    <input type='submit' className='btn btn-primary w-100 py-2 mt-3 mb-5' value={'확인'}/>
                </form>
            }
        </section>
    );
}