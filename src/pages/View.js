import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { Viewer } from '@toast-ui/react-editor';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import service from '../service';

// 저장된 데이터 로드
function useData(index) {
    const [data, setData] = useState({}); // 불러온 데이터 관리

    useEffect(() => {
        if (index === 0) return;
        service.loadPost(index).then(
            (res) => {setData(res.data);}
        )
    }, [index])

    return [data];
}

function useCsrfToken() {
    const [csrfToken, setCsrfToken] = useState({}); // 불러온 CSRF 토큰 관리

    useEffect(() => {
        service.getCsrfToken().then(
            (res) => {setCsrfToken(res.data.csrf_token);}
        )
    }, [])

    return [csrfToken];
}

export default function View() {
    // 라우팅 부분
    const navigate = useNavigate();

    // 출력값 처리 부분
    const location = useLocation(null); // 현재 페이지 위치 추출
    const index = location.state ? location.state.idx : 0; // 현제 페이지 번호 추출
    const [data] = useData(index);

    // 입력값 처리 부분
    const [csrfToken] = useCsrfToken();

    // 게시물 삭제
    const handleDelete = (idx) => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            service.deletePost(idx, csrfToken).then(
                (res) => {
                    if (res.data.rs === 1) {
                        alert('정상적으로 삭제되었습니다.');
                        navigate('/post');
                    }
                }
            )
        }
    }

    // 화면 출력 부분
    return (
        <section className='container-fluid container-xl px-5'>
            <div className='mb-5 border-bottom'>
                <h1 className='ms-5'>게시물 보기</h1>
            </div>
            {index > 0 ? (
                <Fragment>
                    <h3 className='mt-4 mb-5'>{data.title}</h3>
                    <Viewer initialValue={data.content} key={data.content}/>
                    {(localStorage.getItem('token') !== null) ? (
                        <div className='mt-5'>
                            <Link className='btn btn-primary' to={'/write'} state={{idx:index}}>수정하기</Link>
                            <button className='btn btn-primary ms-2' onClick={() => handleDelete(index)}>삭제하기</button>
                            <Link className='btn btn-primary float-right ms-2' to={'/post'}>목록보기</Link>
                        </div>
                    ) : (
                        <Link className='btn btn-primary float-right' to={'/post'}>목록보기</Link>
                    )}
                </Fragment>
            ) : (
                <h3 className='mt-4'>유효하지 않은 페이지입니다.</h3>
            )}
        </section>
    );
}