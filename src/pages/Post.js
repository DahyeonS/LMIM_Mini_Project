import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { useEffect, useState, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import service from '../service';

export default function Post() {
    // 출력값 반영
    const location = useLocation(); // 현재 페이지 위치 추출
    const [data, setData] = useState({}); // 불러온 데이터 관리

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = queryParams.get('page');

        service.getPost(page).then(
            (res) => {
                setData(res.data);
            }
        )
    }, [location.search])

    // 화면 출력 부분
    return (
        <div className='container-fluid container-xl'>
            <h1 className='pb-2 ms-3 my-3 border-bottom'>게시판</h1>
            {(localStorage.getItem('token') !== null) ? (
                <button className='btn btn-secondary'>글쓰기</button>
            ) : (
                <Fragment></Fragment>
            )}
        </div>
    );
}