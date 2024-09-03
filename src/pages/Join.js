import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../service';

// 저장된 데이터 로드
function useCsrfToken() {
    const [csrfToken, setCsrfToken] = useState({}); // 불러온 CSRF 토큰 반영

    useEffect(() => { // 페이지 로드시 실행
        // CSRF 토큰
        service.getCsrfToken().then(
            (res) => {setCsrfToken(res.data.csrf_token);}
        )
    }, []) // 한 번만 실행

    return [csrfToken];
}

function useData() {
    const [data, setData] = useState({}); // 불러온 데이터 상태 반영

    useEffect(() => { 
        // 계정 생성 가능 여부
        service.loadUser().then(
            (res) => {setData(res.data);}
        )
    }, [])

    return [data];
}

export default function Join() {
    // 라우팅 부분
    const navigate = useNavigate();

    // 출력값 처리 부분
    const [data] = useData();
    
    // 입력값 처리 부분
    const [csrfToken] = useCsrfToken();
    const [values, setValues] = useState({}); // 입력값 반영

    const idFocus = useRef(null); // 아이디 참조
    const pwFocus = useRef(null); // 비밀번호 참조
    const pw2Focus = useRef(null); // 비밀번호 확인 참조
    const emailFocus = useRef(null); // 이메일 참조

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
        e.preventDefault(); // 페이지 변경 방지

        // 빈 공간이 있거나 비밀번호가 일치하지 않으면 전송 X
        if (!values.id || !values.pw || !values.pw2 || !values.email || values.pw !== values.pw2) {
            if (!values.id) {
                alert('아이디를 입력해주세요.');
                idFocus.current.focus();
            } else if (!values.pw) {
                alert('비밀번호를 입력해주세요.');
                pwFocus.current.focus();
            } else if (!values.pw2) {
                alert('비밀번호 확인이 필요합니다.');
                pw2Focus.current.focus();
            } else if (!values.email) {
                alert('이메일을 입력해주세요.');
                emailFocus.current.focus();
            } else {
                alert('비밀번호가 일치하지 않습니다');
                pw2Focus.current.focus();
            }

            return false;
        }

        service.createUser(values, csrfToken).then(
            (res) => {
                if (res.data.rs === 1) {
                    alert('회원가입이 완료되었습니다.');
                    navigate('/login');
                }
            }
        )
    }

    // 화면 출력 부분
    return (
        <section className='container-fluid container-xl px-5'>
            <div className='pt-5 border-bottom'>
                <h1 className='pt-5 text-secondary fw-bold fst-italic'>회원가입</h1>
            </div>
            {data.rs < 1 ? (
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='id'>아이디</label>
                        <input type='text' id='id' className='form-control' name='id' onChange={handleChange} ref={idFocus} maxLength={20}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='pw'>비밀번호</label>
                        <input type='password' id='pw' className='form-control' name='pw' onChange={handleChange} ref={pwFocus} maxLength={150}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='pw2'>비밀번호 확인</label>
                        <input type='password' id='pw2' className='form-control' name='pw2' onChange={handleChange} ref={pw2Focus} maxLength={150}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'>이메일</label>
                        <input type='email' id='email' className='form-control' name='email' onChange={handleChange} ref={emailFocus} maxLength={120}/>
                    </div>
                    <div>
                        <input type='submit' className='btn btn-primary w-100 py-2' value={'가입하기'}/>
                    </div>
                </form>
            ) : (
                <h3>가입할 수 없습니다.</h3>
            )}
        </section>
    );
}