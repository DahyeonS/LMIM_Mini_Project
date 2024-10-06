import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { Link } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import service from '../service';
import moment from 'moment';

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
function usePostData() { // 게시물 데이터
    const [postData, setPostData] = useState({}); // 불러온 데이터 반영

    useEffect(() => { // 페이지 로드시 실행
        service.getPost().then(
            (res) => {setPostData(res.data);} // 응답받은 값을 data에 저장
        )
    }, []) // 페이지가 변경될 때마다 한 번만 실행

    return postData;
}

function useBoardData() { // 방명록 데이터
    const [boardData, setBoardData] = useState({}); // 불러온 데이터 반영

    useEffect(() => { // 페이지 로드시 실행
        service.getBoard().then(
            (res) => {setBoardData(res.data);} // 응답받은 값을 data에 저장
        )
    }, []) // 페이지가 변경될 때마다 한 번만 실행

    return boardData;
}

export default function Home() {
    // 출력값 처리 부분
    const postData = usePostData();
    const boardData = useBoardData();
    const today = moment().subtract('24', 'hours'); // 현재 시각
    const isMobile = UseIsMoblie();
    const isDeskTop = UseIsDeskTop();

    // 화면 출력 부분
    return (
        <div className='container-fluid container-xl'>
            <div>
                <h1 className='py-4 fw-bold title'><Typewriter words={['Let Me Introduce Myself']} loop={1}/></h1>
            </div>
            <section className='pt-5 pb-5 mt-4 rounded'>
                <div className='mx-5 py-3'>
                    <h2 className='mb-4 opacity-75 fw-bold'>환영합니다!</h2>
                    <h3 className='mb-5 opacity-75'>이 사이트는 Flask와 React로 제작되었습니다.</h3>
                    <h4 className='text-secondary'>아이콘 출처
                        {isMobile
                        ?
                            <Link className='ms-2 text-custom' to={'https://www.remixicon.com/'} target='_blank'>바로가기</Link>
                        :
                            <Link className='ms-2 text-custom' to={'https://www.remixicon.com/'} target='_blank'>https://www.remixicon.com/</Link>
                        }
                    </h4>
                    <h4 className='text-secondary'>Github 링크
                        {isMobile ?
                            <Link className='ms-2 text-custom' to={'https://github.com/DahyeonS/LMIM_Mini_Project'} target='_blank'>바로가기</Link>
                        :
                        <Link className='ms-2 text-custom' to={'https://github.com/DahyeonS/LMIM_Mini_Project'} target='_blank'>https://github.com/DahyeonS/LMIM_Mini_Project</Link>
                        }
                    </h4>
                    <h5 className='mt-5 opacity-75'><Link className='text-secondary' to={'/about'}>이력 소개<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19.1642 12L12.9571 5.79291L11.5429 7.20712L16.3358 12L11.5429 16.7929L12.9571 18.2071L19.1642 12ZM13.5143 12L7.30722 5.79291L5.89301 7.20712L10.6859 12L5.89301 16.7929L7.30722 18.2071L13.5143 12Z"/></svg></Link></h5>
                    <h5 className='mt-2 opacity-75'><Link className='text-secondary' to={'/works'}>작업물<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19.1642 12L12.9571 5.79291L11.5429 7.20712L16.3358 12L11.5429 16.7929L12.9571 18.2071L19.1642 12ZM13.5143 12L7.30722 5.79291L5.89301 7.20712L10.6859 12L5.89301 16.7929L7.30722 18.2071L13.5143 12Z"/></svg></Link></h5>
                </div>
                <div className='mt-5 pt-5 row border-top mx-4'>
                    <div className={`col-11 col-lg-5 ${isDeskTop && 'ms-5'} ${isMobile && 'mx-2'} ${!isDeskTop && !isMobile && 'mx-4'}`}>
                        <h3 className='mb-3 pb-2 fw-bold border-bottom'>최근 게시물</h3>
                        {Array.isArray(postData.items) ?
                            <div className='mb-4'>
                                {postData.items.map((item, index) =>
                                    <Fragment key={`post-${item.idx}`} >
                                        {index + 1 <= 3 &&
                                            <h5 className='text-break mb-3'><Link className='me-3 text-secondary h5' to={'/view'} state={{idx:item.idx}}>
                                                {today.isBefore(moment(item.postdate, 'YYYY.MM.DD hh:mm A')) &&
                                                    <span className='text-decoration-underline text-danger me-2'>[New]</span>
                                                }
                                                {item.title}
                                            </Link></h5>
                                        }
                                    </Fragment>
                                )}
                            </div>
                        :
                            <h3 className='mb-4 text-secondary fst-italic opacity-50'>데이터가 아직 로드되지 않았습니다.</h3>
                        }
                        <h6 className='mt-4'><Link className='text-custom' to={'/post'}>더 보기</Link></h6>
                    </div>
                    <div className={`col-11 col-lg-5 ${isDeskTop ? 'mx-5' : 'mt-5'} ${isMobile ? 'mx-2' : 'mx-4'}`}>
                        <h3 className='mb-3 pb-2 border-bottom fw-bold'>방명록</h3>
                        {Array.isArray(boardData.items) ?
                            <div className='mb-4'>
                                {boardData.items.map((item, index) => (
                                    <Fragment key={`board-${index}`}>
                                        {index + 1 <= 3 &&
                                            <h5 className='text-secondary mb-3 text-break'><span className='fw-bold me-3'>
                                                {item.username.length <= 10 ?
                                                    <Fragment>
                                                        {item.username}
                                                    </Fragment>
                                                :
                                                    <Fragment>
                                                        {item.username.substring(0, 9) + '...'}
                                                    </Fragment>
                                                }
                                            </span>
                                            {item.content <= 30 ?
                                                <Fragment>
                                                    {item.content}
                                                </Fragment>
                                            :
                                                <Fragment>
                                                    {item.content.substring(0, 29) + '...'}
                                                </Fragment>
                                            }
                                            </h5>
                                        }
                                    </Fragment>
                                ))}
                            </div>
                        :
                            <h3 className='mb-4 text-secondary fst-italic opacity-50'>데이터가 아직 로드되지 않았습니다.</h3>
                        }
                        <h6 className='mt-4'><Link className='text-custom' to={'/board'}>더 보기</Link></h6>
                    </div>
                </div>
                <div className='border-top mx-4 mt-5 py-3'>
                    <h4 className='float-end me-3 fst-italic mt-2'><Link className='text-dark opacity-75' to={'/contact'}>Contact<svg className='ms-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19.1642 12L12.9571 5.79291L11.5429 7.20712L16.3358 12L11.5429 16.7929L12.9571 18.2071L19.1642 12ZM13.5143 12L7.30722 5.79291L5.89301 7.20712L10.6859 12L5.89301 16.7929L7.30722 18.2071L13.5143 12Z"/></svg></Link></h4>
                </div>
            </section>
        </div>
    );
}