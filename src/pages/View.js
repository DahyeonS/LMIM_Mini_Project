import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { Viewer } from '@toast-ui/react-editor';
import { Link, useLocation } from 'react-router-dom';
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

export default function View() {
    // 출력값 처리 부분
    const location = useLocation(null); // 현재 페이지 위치 추출
    const index = (location.state !== null) ? (location.state.idx) : 0; // 현제 페이지 번호 추출
    const [data] = useData(index);

    return (
        <div className="container-fluid container-xl">
            <h1 className='ms-3 mt-3 border-bottom'>게시물 보기</h1>
            {(index > 0) ? (
                <Fragment>
                    <h3 className='mt-4'>{data.title}</h3>
                    <Viewer initialValue={data.content}/>
                    {(localStorage.getItem('token') !== null) ? (
                        <Fragment>
                            <Link className='btn btn-secondary' to={'/write'} state={{idx:index}}>수정하기</Link>
                            <button className='btn btn-secondary ms-2'>삭제하기</button>
                        </Fragment>
                    ) : (
                        <Fragment></Fragment>
                    )}
                </Fragment>
            ) : (
                <h3 className='mt-4'>유효하지 않은 페이지입니다.</h3>
            )}
        </div>
    );
}