import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { useEffect, useState, Fragment } from 'react';
import { useLocation, Link } from 'react-router-dom';
import service from '../service';

// 저장된 데이터 로드
function useData() {
    const [data, setData] = useState({}); // 불러온 데이터 반영
    const location = useLocation(null); // 현재 페이지 위치 추출
    const page = location.state ? location.state.page : 1; // 현제 페이지 번호 추출

    useEffect(() => { // 페이지 로드시 실행
        service.getPost(page).then(
            (res) => {setData(res.data);} // 응답받은 값을 data에 저장
        )
    }, [page]) // 페이지가 변경될 때마다 한 번만 실행

    return [data];
}

export default function Post() {
    // 출력값 처리 부분
    const [data] = useData();

    // 화면 출력 부분
    return (
        <section className='container-fluid container-xl px-5'>
            <div className='pt-5 border-bottom'>
                <h1 className='pt-5 text-secondary fw-bold fst-italic'>게시판</h1>
            </div>
            {/* 관리자 한정 글쓰기 버튼 */}
            {localStorage.getItem('token') && (
                <div className='mt-3'>
                    <Link className='btn btn-primary float-end' to={'/write'}>글쓰기</Link>
                </div>
            )}
            {/* 게시판 목록 */}
            {Array.isArray(data.items) ? (
                <div className='pt-5 pb-1'>
                    {data.items.map((item) => (
                        // state에 게시물의 고유번호를 넣은 채로 페이지 이동
                        <Link key={item.idx} className='text-dark' to={'/view'} state={{idx:item.idx}}>
                            <div className='row g-3 my-4 border-bottom'>
                                <div className='col-9 float-left'>
                                    <h2 className='mb-5 fw-bold'>{(item.title.length <= 30) ? (item.title) : (item.title.substring(0, 30) + '...')}</h2>
                                    <h5 className='mt-5 text-secondary'>{(item.content.length <= 50) ? (item.content) : (item.content.substring(0, 50) + '...')}</h5>
                                </div>
                                <div className='col-3 float-right mb-4'>
                                    {(item.photo) ? (
                                        <img src={`./post/load_image?type=uploads&name=${item.photo.split(', ')[0]}`} alt={item.photo.split(', ')[0]} width='300px' height='200px'/>
                                    ) : (
                                        <img src={'./post/load_image?type=static&name=empty_image'} alt='empty'/>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                    {/* 페이징 */}
                    <ul className='pagination justify-content-center py-5 mb-4' style={{marginBottom:0}}>
                        {/* 이전 */}
                        {data.hasPrev ? (
                            <li className='page-item'>
                                <Link className='page-link text-secondary' state={{page:data.prevNum}}>이전</Link>
                            </li>
                        ) : (
                            <li className='page-item disabled'>
                                <Link className='page-link' aria-disabled='true'>이전</Link>
                            </li>
                        )}
                        {/* 페이지 번호 */}
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
                        {/* 다음 */}
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
                <div className='py-5'>
                    <h4 className='text-secondary text-center fst-italic pb-5 opacity-50'>데이터가 아직 로드되지 않았습니다.</h4>
                </div>
            )}
        </section>
    );
}