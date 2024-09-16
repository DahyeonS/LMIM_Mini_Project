import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { useEffect, useRef, useState } from 'react';
import service from '../service';

// 저장된 데이터 로드
function useCsrfToken() {
    const [csrfToken, setCsrfToken] = useState({}); // 불러온 CSRF 토큰 반영

    useEffect(() => {
        service.getCsrfToken().then(
            (res) => {setCsrfToken(res.data.csrf_token);} // CSRF 토큰 저장
        )
    }, []) // 페이지가 로드될 때 한 번만 실행

    return [csrfToken];
}

export default function Contact() {
    // 입력값 처리 부분
    const [csrfToken] = useCsrfToken();
    const [values, setValues] = useState({}); // 입력값 반영

    const nameRef = useRef(null); // 이름 참조
    const emailRef = useRef(null); // 이메일 참조
    const contentRef = useRef(null); // 내용 참조

    // 입력값이 변경될 때마다 자동으로 상태를 갱신
    const handleChange = (e) => {
        const {name, value} = e.target; // 입력값의 name, value 추출
        setValues((prevValues) => ({ // values의 값을 갱신
            ...prevValues, // 이전에 입력된 값을 복사
            [name]: value // 새로운 값을 추가하거나 갱신된 값을 적용
        }))
    }

    // 제출 처리 함수
    const handleSubmit = async(e) => {
        e.preventDefault(); // 페이지 변경 방지

        // 빈 공간이 있을 시 전송 X
        if (!values.name || (!values.email && !values.phone) || !values.content) {
            if (!values.name) {
                alert('이름을 입력해주세요.');
                nameRef.current.focus(); // 이름에 포커스
            } else if (!values.content) {
                alert('내용을 입력해주세요.')
                contentRef.current.focus(); // 내용에 포커스
            } else {
                alert('연락처를 입력해주세요.')
                emailRef.current.focus(); // 이메일에 포커스
            }

            return;
        }
        
        // 값 전송 함수 호출
        service.contact(values, csrfToken).then(
            (res) => {
                if (res.data.rs === 1) {
                    alert('전송이 완료되었습니다.');
                    window.location.reload(); // 새로고침
                }
            }
        )
    }

    // 화면 출력 부분
    return (
        <section className='container-fluid container-xl px-5'>
            <div className='pt-5 border-bottom'>
                <h1 className='pt-5 text-secondary fw-bold fst-italic'>Contact</h1>
            </div>
            <div className='mt-3 mb-5'>
                <h5 className='text-secondary fst-italic'>이름, 연락처와 함께 메시지를 보내면 관리자에게 메일이 전송됩니다.</h5>
            </div>
            <form className='pt-2 pb-5' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name' className='mb-1 text-secondary'>Name</label>
                    <input type='text' className='form-control' id='name' name='name' onChange={handleChange} ref={nameRef}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='email' className='mb-1 text-secondary'>E-mail</label>
                    <input type='email' className='form-control' id='email' name='email' onChange={handleChange} ref={emailRef}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor='phone' className='mb-1 text-secondary'>Phone Number</label>
                    <input type='text' className='form-control' id='phone' name='phone' onChange={handleChange}/>
                </div>
                <div className='mb-4'>
                    <label htmlFor='content' className='mb-1 text-secondary'>Message</label>
                    <textarea type='text' className='form-control py-5' id='content' name='content' onChange={handleChange} ref={contentRef}/>
                </div>
                <div className='pb-5'>
                    <input type='submit' className='btn btn-primary w-100' value={'전송'}/>
                </div>
            </form>
        </section>
    );
}