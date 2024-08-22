import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../service';

export default function Write() {
    // 라우팅 부분
    const navigate = useNavigate();

    // 출력값 부분
    const [csrfToken, setCsrfToken] = useState({});

    // 바로 실행
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('../');
        } else {
            service.getCsrfToken().then(
                (res) => {
                    setCsrfToken(res.data.csrf_token);
                }
            )
        }

    })

    // 화면 출력 부분
    return (
        <div className='container-fluid container-xl'>
            <h1 className='pb-2 ms-3 my-3 border-bottom'>글쓰기</h1>
        </div>
    )
}