import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { Link, NavLink } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';

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

// 스크롤 이벤트 핸들러
function useScroll() {
    const [hasScrolled, setHasScrolled] = useState(false); // 스크롤 상태 관리

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) setHasScrolled(true); // 50px 이상 스크롤 시
            else setHasScrolled(false);
        };
    
        window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 반영 함수
        return () => {
            window.removeEventListener('scroll', handleScroll); // 함수 제거
        };
    }, []); // 페이지가 로드될 때 한 번만 실행

    return hasScrolled;
}

export default function Header() {
    // 화면 출력용 변수
    const [view, setView] = useState(false); // 드롭다운 트리거
    const hasScrolled = useScroll(); // 스크롤 트리거
    const isDeskTop = UseIsDeskTop(); // 기종 확인

    // 로그아웃
    const logout = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            localStorage.removeItem('token'); // 로그인 정보 삭제
            window.location.reload(); // 새로고침
        }
    }

    // 화면 출력 부분
    return (
        <header className={`header d-flex align-items-center fixed-top ${hasScrolled ? 'scrolled' : ''}`}>
            <div className='container-fluid container-xl position-relative d-flex align-items-center'>
                <Link to={'/'} className='logo d-flex align-items-center me-auto'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
                        <path d="M20.998 3V5C20.998 14.6274 15.6255 19 8.99805 19L7.0964 18.9999C7.3079 15.9876 8.24541 14.1648 10.6939 11.9989C11.8979 10.9338 11.7965 10.3189 11.2029 10.6721C7.1193 13.1016 5.09114 16.3862 5.00119 21.6302L4.99805 22H2.99805C2.99805 20.6373 3.11376 19.3997 3.34381 18.2682C3.1133 16.9741 2.99805 15.2176 2.99805 13C2.99805 7.47715 7.4752 3 12.998 3C14.998 3 16.998 4 20.998 3Z"/>
                    </svg>
                </Link>
                <nav className='nav'>
                    <Link onClick={() => setView(!view)} className='mobile-nav-toggle navbar-toggler text-secondary'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"/>
                        </svg>
                    </Link>
                    {isDeskTop && 
                        <ul>
                            <li><NavLink to={'/'}>Home</NavLink></li>
                            <li><NavLink to={'about'}>About</NavLink></li>
                            <li><NavLink to={'works'}>Works</NavLink></li>
                            <li><NavLink to={'post'}>Post</NavLink></li>
                            <li><NavLink to={'board'}>Board</NavLink></li>
                            <li><NavLink to={'contact'}>Contact</NavLink></li>
                            {/* 로그인 한정 */}
                            {localStorage.getItem('token') && (
                                <li onMouseEnter={() => {setView(true)}} onMouseLeave={() => {setView(!view)}}>
                                    <Link className='px-3' to={()=>false}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                            <path d="M20 22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13Z"/>
                                        </svg>
                                    </Link>
                                    {view && 
                                        <ul className='border dropdown-menu dropdown-menu-end pe-2 admin-menu'>
                                            <Fragment>
                                                <li><NavLink to={'update'} >Update</NavLink></li>
                                                <li><Link onClick={logout}>Logout</Link></li>
                                            </Fragment>
                                        </ul>
                                    }
                                </li>
                            )}
                        </ul>
                    }
                    {!isDeskTop && view &&
                        <ul className='border collapse dropdown-menu dropdown-menu-end mobile-menu'>
                            <li><NavLink to={'/'}>Home</NavLink></li>
                            <li><NavLink to={'about'}>About</NavLink></li>
                            <li><NavLink to={'works'}>Works</NavLink></li>
                            <li><NavLink to={'post'}>Post</NavLink></li>
                            <li><NavLink to={'board'}>Board</NavLink></li>
                            <li><NavLink to={'contact'}>Contact</NavLink></li>
                        </ul>
                    }
                </nav>
            </div>
        </header>
    );
}