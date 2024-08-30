import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';

export default function Header() {
    // 라우팅 부분
    const navigate = useNavigate();

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
        <header className='header d-flex align-items-center fixed-top'>
            <div className='container-fluid container-xl position-relative d-flex align-items-center'>
                <Link to={'/'} className='logo d-flex align-items-center me-auto'>자기소개</Link>
                <nav className='nav'>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarCollapse' aria-controls='navbarCollapse' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'/>
                    </button>
                    <ul>
                        <li><NavLink to={'/'}>Home</NavLink></li>
                        <li><NavLink to={'about'}>About</NavLink></li>
                        <li><NavLink to={'works'}>Works</NavLink></li>
                        <li><NavLink to={'post'}>Post</NavLink></li>
                        <li><NavLink to={'board'}>Board</NavLink></li>
                        <li><NavLink to={'contact'}>Contact</NavLink></li>
                        {/* 로그인 한정 */}
                        {(localStorage.getItem('token') !== null) ? (
                            <Fragment>
                            <li><NavLink to={'update'} >Update</NavLink></li>
                            <li><Link to={()=>false} onClick={logout}>Logout</Link></li>
                            </Fragment>
                        ) : (
                            <Fragment/>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}