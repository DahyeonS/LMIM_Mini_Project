import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';

// 스크롤 이벤트 핸들러
function useScroll() {
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) setHasScrolled(true); // 50px 이상 스크롤 시
            else setHasScrolled(false);
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return [hasScrolled];
}

export default function Header() {
    // 라우팅 부분
    const navigate = useNavigate();

    // 화면 출력용 변수
    const [view, setView] = useState(false); // 드롭다운 트리거
    const [hasScrolled] = useScroll(); // 스크롤 트리거

    // 로그아웃
    const logout = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            localStorage.removeItem('token');
            navigate('../');
            window.location.reload();
        }
    }

    // 화면 출력 부분
    return (
        <header className={`header d-flex align-items-center fixed-top ${hasScrolled ? 'scrolled' : ''}`}>
            <div className='container-fluid container-xl position-relative d-flex align-items-center'>
                <Link to={'/'} className='logo d-flex align-items-center me-auto'>자기소개</Link>
                <nav className='nav'>
                    <ul>
                        <li><NavLink to={'/'}>Home</NavLink></li>
                        <li><NavLink to={'about'}>About</NavLink></li>
                        <li><NavLink to={'works'}>Works</NavLink></li>
                        <li><NavLink to={'post'}>Post</NavLink></li>
                        <li><NavLink to={'board'}>Board</NavLink></li>
                        <li><NavLink to={'contact'}>Contact</NavLink></li>
                        {/* 로그인 한정 */}
                        {(localStorage.getItem('token') !== null) && (
                            <li onMouseEnter={() => {setView(true)}} onMouseLeave={() => {setView(!view)}}>
                                <Link className='px-3' to={()=>false}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                        <path d="M20 22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13Z"/>
                                    </svg>
                                </Link>
                                {view && (
                                    <ul className='border position-absolute dropdown-menu pe-2' style={{display:'block', width:'5rem'}}>
                                        <Fragment>
                                            <li><NavLink to={'update'} >Update</NavLink></li>
                                            <li><Link to={()=>false} onClick={logout}>Logout</Link></li>
                                        </Fragment>
                                    </ul>
                                )}
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}