import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../service';

// 저장된 데이터 로드
function useCsrfToken() {
    const [csrfToken, setCsrfToken] = useState({}); // 불러온 CSRF 토큰 반영

    // 바로 실행
    useEffect(() => {
        // CSRF 토큰
        service.getCsrfToken().then(
            (res) => {setCsrfToken(res.data.csrf_token);}
        )
    }, [])

    return [csrfToken]
}

export default function Login() {
    // 라우팅 부분
    const navigate = useNavigate();

    // 입력값 처리 부분
    const [csrfToken] = useCsrfToken();
    const [values, setValues] = useState({}); // 입력값 반영

    const idFocus = useRef(null); // 아이디 참조
    const pwFocus = useRef(null); // 비밀번호 참조

    // 입력값이 변경될 때마다 자동으로 상태를 갱신
    const handleChange = (e) => {
        const {name, value} = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }))
    }

    // 제출 처리 함수
    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!values.id || !values.pw) {
            if (!values.id) {
                alert('아이디를 입력해주세요.')
                idFocus.current.focus();
            } else {
                alert('비밀번호를 입력해주세요.')
                pwFocus.current.focus();
            }

            return false
        }

        service.login(values, csrfToken).then(
            (res) => {
                if (res.data.rs === 1) {
                    alert('로그인에 성공하였습니다.');
                    localStorage.setItem('token', res.data.access_token);
                    navigate('../');
                } else {
                    alert('로그인에 실패하였습니다. 아이디와 비빌번호를 다시 확인해주세요.');
                    idFocus.current.focus();
                }
            }
        )
    }

    // 화면 출력 부분
    return (
        <section className='container-fluid container-xl px-5'>
            <div className='pt-5 border-bottom'>
                <h1 className='pt-5 text-secondary fw-bold fst-italic'>로그인</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='id'>아이디</label>
                    <input type='text' id='id' name='id' className='form-control' ref={idFocus} onChange={handleChange} maxLength={20}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='pw'>비밀번호</label>
                    <input type='password' id='pw' name='pw' className='form-control' ref={pwFocus} onChange={handleChange} maxLength={150}/>
                </div>
                <div>
                    <input type='submit' className='btn btn-primary w-100 py-2' value={'로그인'}/>
                </div>
            </form>
        </section>
    );
}