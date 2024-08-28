import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { useLocation } from 'react-router-dom';

export default function View() {
    // 출력값 처리 부분
    const location = useLocation(null); // 현재 페이지 위치 추출
    const index = (location.state !== null) ? (location.state.idx) : 0;

    return (
        <div className="container-fluid container-xl">
            <h1 className='ms-3 mt-3 border-bottom'>게시물 보기</h1>
            {(index !== 0) ? (
                <h3>{index}</h3>
            ) : (
                <h3>유효하지 않은 페이지입니다.</h3>
            )}
        </div>
    );
}