import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { useEffect, useState, useRef } from 'react';
import service from '../service';

export default function Join() {
    // 출력값 처리 부분
    const [data, setData] = useState({}); // 불러온 데이터 상태 관리
    
    // 입력값 처리 부분
    const [csrfToken, setCsrfToken] = useState({}); // 불러온 CSRF 토큰 관리
    const [values, setValues] = useState({}); // 입력값 반영
    const idFocus = useRef(null); // 아이디 참조
    const pwFocus = useRef(null); // 비밀번호 참조
    const pw2Focus = useRef(null); // 비밀번호 확인 참조
    const emailFocus = useRef(null); // 이메일 참조

    // 저장된 데이터 로드
    useEffect(() => { // 페이지 로드시 실행
        // 계정 생성 가능 여부
        service.getCsrfToken().then(
            (res) => {
                setCsrfToken(res.data.csrf_token);
            }
        )

        service.loadUser().then(
            (res) => {
                setData(res.data);
            }
        )
    }, []) // 한 번만 실행

    // 입력값이 변경될 때마다 자동으로 상태를 반영
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
                alert('아이디를 입력하세요.');
                idFocus.current.focus();
            } else if (!values.pw) {
                alert('비밀번호를 입력하세요.');
                pwFocus.current.focus();
            } else if (!values.pw2) {
                alert('비밀번호 확인이 필요합니다.');
                pw2Focus.current.focus();
            } else if (!values.email) {
                alert('이메일을 입력하세요.');
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
                    window.location.href = '/login';
                }
            }
        )
    }

    // 화면 출력 부분
    return (
        <div className="container-fluid container-xl">
            <h1 className='pb-2 ms-3 my-3 border-bottom'>회원가입</h1>
            {(data.rs < 1) ? (
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label for='id'>아이디</label>
                        <input type='text' id='id' className='form-control' name='id' onChange={handleChange} ref={idFocus}></input>
                    </div>
                    <div className='mb-3'>
                        <label for='pw'>비밀번호</label>
                        <input type='password' id='pw' className='form-control' name='pw' onChange={handleChange} ref={pwFocus}></input>
                    </div>
                    <div className='mb-3'>
                        <label for='pw2'>비밀번호 확인</label>
                        <input type='password' id='pw2' className='form-control' name='pw2' onChange={handleChange} ref={pw2Focus}></input>
                    </div>
                    <div className='mb-3'>
                        <label for='email'>이메일</label>
                        <input type='email' id='email' className='form-control' name='email' onChange={handleChange} ref={emailFocus}></input>
                    </div>
                    <div>
                        <input type='submit' className='btn btn-secondary w-100 py-2' value={'가입하기'}></input>
                    </div>
                </form>
            ) : (
                <div>
                    <h3>가입할 수 없습니다.</h3>
                </div>
            )}
        </div>
    );
}