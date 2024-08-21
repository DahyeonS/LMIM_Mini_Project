import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Update() {
    // 라우팅 부분
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') === null) navigate('../');
    })

    // 화면 출력 부분
    return (
        <div className="container-fluid container-xl">
            <h1 className='pb-2 ms-3 my-3 border-bottom'>회원정보 수정</h1>
        </div>
    );
}