import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { useEffect, useState, Fragment } from 'react';
import { useLocation, Link } from 'react-router-dom';
import service from '../service';

// 저장된 데이터 로드
function useData() {
    const location = useLocation(); // 현재 페이지 위치 추출
    const [data, setData] = useState({}); // 불러온 데이터 관리

    useEffect(() => { // 페이지 로드시 실행
        const queryParams = new URLSearchParams(location.search);
        const page = queryParams.get('page');

        service.getPost(page).then(
            (res) => {setData(res.data);}
        )
    }, [location.search]) // 주소가 변경될 때마다 실행

    return [data];
}

export default function Post() {
    // 출력값 반영
    const [data] = useData();

    // 화면 출력 부분
    return (
        <div className='container-fluid container-xl'>
            <h1 className='pb-2 ms-3 my-3 border-bottom'>게시판</h1>
            {Array.isArray(data.items) ? (
                <div className='py-3'>
                    {data.items.map((item) => (
                        <Link key={item.idx} className='text-dark' to={'/view'} state={{idx:item.idx}}>
                            <div className='row g-3 my-3 border-bottom'>
                                    <div className='col-9 float-left'>
                                        <h2 className='mb-5'>{(item.title.length <= 30) ? (item.title) : (item.title.substring(0, 30) + '...')}</h2>
                                        <h4 className='mt-5'>{(item.content.length <= 50) ? (item.content) : (item.content.substring(0, 50) + '...')}</h4>
                                    </div>
                                    {(item.photo) ? (
                                        <div className='col-3 float-right'><img src={`./post/load_image?type=uploads&name=${item.photo.split(', ')[0]}`} alt={item.photo.split(', ')[0]} width='300px' height='200px'/></div>
                                    ) : (
                                        <div className='col-3 float-right'><img src={'./post/load_image?type=static&name=empty_image'} alt='empty'></img></div>
                                    )}
                            </div>
                        </Link>
                    ))}
                    {/* 페이징 */}
                    <ul className='pagination justify-content-center py-5'>
                        {(data.hasPrev) ? (
                            <li className='page-item'>
                                <Link className='page-link text-secondary' to={`?page=${data.prevNum}`}>이전</Link>
                            </li>
                        ) : (
                            <li className='page-item disabled'>
                                <Link className='page-link' to={()=>false} aria-disabled='true'>이전</Link>
                            </li>
                        )}
                        {data.iterPages.map((pageNum) => (
                            <Fragment key={`paging-${pageNum}`}>
                            {(pageNum !== null) ? (
                                <Fragment key={`paging-fragment-${pageNum}`}>
                                {(pageNum !== data.page) ? (
                                    <li className='page-item' >
                                        <Link className='page-link text-secondary' to={`?page=${pageNum}`}>{pageNum}</Link>
                                    </li>
                                ) : (
                                    <li className='page-item active' aria-current='page'>
                                        <Link className='page-link bg-secondary' tabIndex={-1} to={()=>false} onClick={(e) => e.preventDefault()}>{pageNum}</Link>
                                    </li>                            
                                )}
                                </Fragment>
                            ) : (
                                <li className='disabled'>
                                    <Link className='page-link' to={()=>false}>...</Link>
                                </li>
                            )}
                            </Fragment>
                        ))}
                        {(data.hasNext) ? (
                            <li>
                                <Link className='page-link text-secondary' to={`?page=${data.nextNum}`}>다음</Link>
                            </li>
                        ) : (
                            <li className='page-item disabled'>
                                <Link className='page-link' to={()=>false} tabIndex={-1} aria-disabled='true'>다음</Link>
                            </li>
                        )}
                    </ul>
                </div>
            ) : (
                // 로딩 대기 문구
                <div className='text-center fw-bold'>데이터가 아직 로드되지 않았습니다.</div>
            )}
            {(localStorage.getItem('token') !== null) ? (
                <Link className='btn btn-secondary' to={'/write'}>글쓰기</Link>
            ) : (
                <Fragment/>
            )}
        </div>
    );
}