import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { useEffect, useState, Fragment } from 'react';
import { useLocation, Link } from 'react-router-dom';
import service from '../service';

// 저장된 데이터 로드
function useData() {
    const [data, setData] = useState({}); // 불러온 데이터 관리
    const location = useLocation(null); // 현재 페이지 위치 추출
    const page = location.state ? location.state.page : 1; // 현제 페이지 번호 추출

    useEffect(() => { // 페이지 로드시 실행
        service.getPost(page).then(
            (res) => {setData(res.data);}
        )
    }, [page]) // 주소가 변경될 때마다 실행

    return [data];
}

export default function Post() {
    // 출력값 반영
    const [data] = useData();

    // 화면 출력 부분
    return (
        <section className='container-fluid container-xl px-5'>
            <div className='mb-5'>
                <h1 className='ms-5'>게시판</h1>
            </div>
            {Array.isArray(data.items) ? (
                <div className='py-3'>
                    <div className='border-bottom'>
                        {data.items.map((item) => (
                            <Link key={item.idx} className='text-dark' to={'/view'} state={{idx:item.idx}}>
                                <div className='row g-3 my-3 border-top'>
                                        <div className='col-9 float-left'>
                                            <h2 className='mb-5'>{(item.title.length <= 30) ? (item.title) : (item.title.substring(0, 30) + '...')}</h2>
                                            <h4 className='mt-5'>{(item.content.length <= 50) ? (item.content) : (item.content.substring(0, 50) + '...')}</h4>
                                        </div>
                                        {(item.photo) ? (
                                            <div className='col-3 float-right'><img src={`./post/load_image?type=uploads&name=${item.photo.split(', ')[0]}`} alt={item.photo.split(', ')[0]} width='300px' height='200px'/></div>
                                        ) : (
                                            <div className='col-3 float-right'><img src={'./post/load_image?type=static&name=empty_image'} alt='empty'/></div>
                                        )}
                                </div>
                            </Link>
                        ))}
                    </div>
                    {/* 페이징 */}
                    <ul className='pagination justify-content-center py-5'>
                        {data.hasPrev ? (
                            <li className='page-item'>
                                <Link className='page-link text-secondary' state={{page:data.prevNum}}>이전</Link>
                            </li>
                        ) : (
                            <li className='page-item disabled'>
                                <Link className='page-link' aria-disabled='true'>이전</Link>
                            </li>
                        )}
                        {data.iterPages.map((pageNum) => (
                            <Fragment key={`paging-${pageNum}`}>
                            {pageNum !== null ? (
                                <Fragment key={`paging-fragment-${pageNum}`}>
                                {pageNum !== data.page ? (
                                    <li className='page-item' >
                                        <Link className='page-link text-secondary' state={{page:pageNum}}>{pageNum}</Link>
                                    </li>
                                ) : (
                                    <li className='page-item active' aria-current='page'>
                                        <Link className='page-link' style={{backgroundColor:'rgba(119, 182, 202, 0.9)', border:'rgba(119, 182, 202, 0.9)'}} tabIndex={-1} onClick={(e) => e.preventDefault()}>{pageNum}</Link>
                                    </li>                            
                                )}
                                </Fragment>
                            ) : (
                                <li className='disabled'>
                                    <Link className='page-link'>...</Link>
                                </li>
                            )}
                            </Fragment>
                        ))}
                        {data.hasNext ? (
                            <li>
                                <Link className='page-link text-secondary' state={{page:data.nextNum}}>다음</Link>
                            </li>
                        ) : (
                            <li className='page-item disabled'>
                                <Link className='page-link' tabIndex={-1} aria-disabled='true'>다음</Link>
                            </li>
                        )}
                    </ul>
                </div>
            ) : (
                // 로딩 대기 문구
                <div className='text-center fw-bold'>데이터가 아직 로드되지 않았습니다.</div>
            )}
            {localStorage.getItem('token') !== null && (
                <Link className='btn btn-primary' to={'/write'}>글쓰기</Link>
            )}
        </section>
    );
}