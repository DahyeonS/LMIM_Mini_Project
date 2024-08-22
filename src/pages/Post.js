import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { useEffect, useState, Fragment } from 'react';
import { useLocation, Link } from 'react-router-dom';
import service from '../service';

export default function Post() {
    // 출력값 반영
    const location = useLocation(); // 현재 페이지 위치 추출
    const [data, setData] = useState({}); // 불러온 데이터 관리

    // 저장된 데이터 로드
    useEffect(() => { // 페이지 로드시 실행
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
                <Link className='btn btn-secondary' to={'/write'}>글쓰기</Link>
            ) : (
                <Fragment/>
            )}
        </div>
    );
}