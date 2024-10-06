import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { Viewer } from '@toast-ui/react-editor';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import service from '../service';

// 모바일 확인
function UseIsMoblie() {
    const [isMobile, setIsMobile] = useState(false); // 모바일 상태 반영

    useEffect(() => {
        if (typeof window) {
            if (window.innerWidth > 768) setIsMobile(false);
            else setIsMobile(true);
        }
    }, []) // 페이지가 로드될 때 한 번만 실행

    return isMobile;
}

// 데스크톱 확인
function UseIsDeskTop() {
    const [isDeskTop, setIsDeskTop] = useState(false); // 데스크톱 상태 반영

    useEffect(() => {
        if (typeof window) {
            if (window.innerWidth < 1200) setIsDeskTop(false);
            else setIsDeskTop(true);
        }
    }, []) // 페이지가 로드될 때 한 번만 실행

    return isDeskTop;
}

// 저장된 데이터 로드
function useData(index, navigate) {
    const [data, setData] = useState({}); // 불러온 데이터 반영

    useEffect(() => {
        if (index === 0) navigate('/post'); // 잘못된 페이지 이동 방지
        service.loadPost(index).then(
            (res) => {
                if (res.data.rs === 1) setData(res.data); // 응답받은 값을 data에 저장
                else navigate('/post'); // 잘못된 페이지 이동 방지
            }
        )
    }, [index, navigate]) // 페이지가 로드될 때 한 번만 실행

    return data;
}

function useCsrfToken() {
    const [csrfToken, setCsrfToken] = useState({}); // 불러온 CSRF 토큰 반영

    useEffect(() => {
        service.getCsrfToken().then(
            (res) => {setCsrfToken(res.data.csrf_token);} // CSRF 토큰 저장
        )
    }, []) // 페이지가 로드될 때 한 번만 실행

    return csrfToken;
}

export default function View() {
    // 라우팅 부분
    const location = useLocation(null); // 현재 페이지 위치 추출
    const navigate = useNavigate(); // 페이지 이동

    let index = location.state ? location.state.idx : 0; // 현재 페이지 번호 추출
    const params = new URLSearchParams(location.search); // 주소창에서 페이지 번호 추출
    if (params.get('num')) index = params.get('num'); // 주소창에 페이지 번호가 있으면 대체
    
    // 출력값 처리 부분
    const data = useData(index, navigate);
    const isMobile = UseIsMoblie();
    const isDeskTop = UseIsDeskTop();

    // 입력값 처리 부분
    const csrfToken = useCsrfToken();

    // 링크 복사
    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.href}?num=${index}`);
        alert('주소가 복사되었습니다.');
    }

    // 게시물 삭제
    const handleDelete = (e) => {
        e.preventDefault(); // 페이지 변경 방지

        if (window.confirm('정말로 삭제하시겠습니까?')) {
            service.deletePost(index, csrfToken).then(
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
        <section className='container-fluid container-xl px-5 rounded'>
            <div className='pt-5 border-bottom'>
                <h1 className='pt-5 text-secondary fw-bold'>{data.title}</h1>
            </div>
            <div className='row text-secondary fst-italic opacity-75 mt-2'>
                <h5 className={`col-12 col-md-5 col-lg-4 ${!isDeskTop && 'h6'}`}>작성일 {data.postdate}</h5>
                {data.modified_date && (
                    <Fragment>
                        <div className='col-md-2 col-lg-4'/>
                        <div className='col-12 col-md-5 col-lg-4'>
                            <h5 className={`${!isDeskTop && 'h6'} ${!isMobile && 'float-end'}`}>수정일 {data.modified_date}</h5>
                        </div>
                    </Fragment>
                )}
            </div>
            {index > 0 && (
                <Fragment>
                    {localStorage.getItem('token') ? ( // 관리자 로그인
                        <div className='pt-2 row'>
                            {isMobile ? // 모바일
                                <Fragment>
                                    <div className='col-12'>
                                        <Link className='btn btn-primary' to={'/write'} state={{idx:index}}>수정하기</Link>
                                        <Link className='btn btn-secondary ms-2' onClick={handleDelete}>삭제하기</Link>
                                    </div>
                                    <div className='mt-2'>
                                        <Link className='btn btn-primary' to={'/post'}>목록보기</Link>
                                        <button onClick={handleCopyLink} className='btn btn-outline-secondary ms-2'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mb-1'>
                                                <path d="M17.6567 14.8284L16.2425 13.4142L17.6567 12C19.2188 10.4379 19.2188 7.90524 17.6567 6.34314C16.0946 4.78105 13.5619 4.78105 11.9998 6.34314L10.5856 7.75736L9.17139 6.34314L10.5856 4.92893C12.9287 2.58578 16.7277 2.58578 19.0709 4.92893C21.414 7.27208 21.414 11.0711 19.0709 13.4142L17.6567 14.8284ZM14.8282 17.6569L13.414 19.0711C11.0709 21.4142 7.27189 21.4142 4.92875 19.0711C2.5856 16.7279 2.5856 12.9289 4.92875 10.5858L6.34296 9.17157L7.75717 10.5858L6.34296 12C4.78086 13.5621 4.78086 16.0948 6.34296 17.6569C7.90506 19.2189 10.4377 19.2189 11.9998 17.6569L13.414 16.2426L14.8282 17.6569ZM14.8282 7.75736L16.2425 9.17157L9.17139 16.2426L7.75717 14.8284L14.8282 7.75736Z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </Fragment>
                            : // 데스크톱
                                <Fragment>
                                <div className='col-2'>
                                    <Link className='btn btn-primary' to={'/post'}>목록보기</Link>
                                    <button onClick={handleCopyLink} className='btn btn-outline-secondary ms-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mb-1'>
                                            <path d="M17.6567 14.8284L16.2425 13.4142L17.6567 12C19.2188 10.4379 19.2188 7.90524 17.6567 6.34314C16.0946 4.78105 13.5619 4.78105 11.9998 6.34314L10.5856 7.75736L9.17139 6.34314L10.5856 4.92893C12.9287 2.58578 16.7277 2.58578 19.0709 4.92893C21.414 7.27208 21.414 11.0711 19.0709 13.4142L17.6567 14.8284ZM14.8282 17.6569L13.414 19.0711C11.0709 21.4142 7.27189 21.4142 4.92875 19.0711C2.5856 16.7279 2.5856 12.9289 4.92875 10.5858L6.34296 9.17157L7.75717 10.5858L6.34296 12C4.78086 13.5621 4.78086 16.0948 6.34296 17.6569C7.90506 19.2189 10.4377 19.2189 11.9998 17.6569L13.414 16.2426L14.8282 17.6569ZM14.8282 7.75736L16.2425 9.17157L9.17139 16.2426L7.75717 14.8284L14.8282 7.75736Z"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className='col-6 col-lg-7'/>
                                <div className='col-4 col-lg-3'>
                                    <Link className='btn btn-secondary ms-2 float-end' onClick={handleDelete}>삭제하기</Link>
                                    <Link className='btn btn-primary float-end' to={'/write'} state={{idx:index}}>수정하기</Link>
                                </div>
                                </Fragment>
                            }
                        </div>
                    ) : ( // 비로그인
                        <div className={`row ${!isMobile ? 'pt-2' : 'pt-1'}`}>
                            <div className='col-5 col-lg-10'/>
                            <div className='col-7 col-lg-2'>
                                <button onClick={handleCopyLink} className='btn btn-outline-secondary ms-2 float-end'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className='mb-1'>
                                        <path d="M17.6567 14.8284L16.2425 13.4142L17.6567 12C19.2188 10.4379 19.2188 7.90524 17.6567 6.34314C16.0946 4.78105 13.5619 4.78105 11.9998 6.34314L10.5856 7.75736L9.17139 6.34314L10.5856 4.92893C12.9287 2.58578 16.7277 2.58578 19.0709 4.92893C21.414 7.27208 21.414 11.0711 19.0709 13.4142L17.6567 14.8284ZM14.8282 17.6569L13.414 19.0711C11.0709 21.4142 7.27189 21.4142 4.92875 19.0711C2.5856 16.7279 2.5856 12.9289 4.92875 10.5858L6.34296 9.17157L7.75717 10.5858L6.34296 12C4.78086 13.5621 4.78086 16.0948 6.34296 17.6569C7.90506 19.2189 10.4377 19.2189 11.9998 17.6569L13.414 16.2426L14.8282 17.6569ZM14.8282 7.75736L16.2425 9.17157L9.17139 16.2426L7.75717 14.8284L14.8282 7.75736Z"/>
                                    </svg>
                                </button>
                                <Link className='btn btn-primary float-end' to={'/post'}>목록보기</Link>
                            </div>
                        </div>
                    )}
                    <div className='pt-4 pb-5'>
                        <Viewer initialValue={data.content} key={data.content}/>
                    </div>
                    {data.tag && 
                        <div className='mb-1 text-break'>
                            {data.tag.split(' ').map((tag, index) => 
                                <Link to={'/post'} state={{tag:tag}} className='fst-italic text-custom me-2' key={`tag-${index}`}>#{tag}</Link>
                            )}
                        </div>
                    }
                    {localStorage.getItem('token') ? ( // 관리자 로그인
                        <div className='border-top row pt-2 pb-5'>
                            <div className='col-4 col-md-2'>
                                <Link className='text-secondary' to={'/post'}>목록보기</Link>
                            </div>
                            <div className='col-1 col-md-7'/>
                            <div className='col-7 col-md-3'>
                                <Link className='text-danger ms-2 float-end' onClick={handleDelete}>삭제하기</Link>
                                <Link className='text-secondary float-end' to={'/write'} state={{idx:index}}>수정하기</Link>
                            </div>
                        </div>
                    ) : ( // 비로그인
                        <div className='border-top row pt-2 pb-5'>
                            <div className='col-8 col-md-10'/>
                            <div className='col-4 col-md-2'>
                                <Link className='text-secondary float-end' to={'/post'}>목록보기</Link>
                            </div>
                        </div>
                    )}
                </Fragment>
            )}
        </section>
    );
}