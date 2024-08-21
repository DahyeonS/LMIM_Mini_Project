import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { Link, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';

export default function Header() {
    // 라우팅 부분
    const navigate = useNavigate();

    const logout = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            localStorage.removeItem('token');
            navigate('../');
        }
    }

    // 화면 출력 부분
    return (
        <header className="header d-flex align-items-center fixed-top">
            <div className="container-fluid container-xl position-relative d-flex align-items-center">
                <Link to={"/"} className="logo d-flex align-items-center me-auto">자기소개</Link>
                <nav className='nav'>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <ul>
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"about"}>About</Link></li>
                        <li><Link to={"works"}>Works</Link></li>
                        <li><Link to={"post"}>Post</Link></li>
                        <li><Link to={"board"}>Board</Link></li>
                        <li><Link to={"contact"}>Contact</Link></li>
                        {(localStorage.getItem('token') !== null) ? (
                            <li><Link to={()=>false} onClick={logout}>Logout</Link></li>
                        ) : (
                            <Fragment></Fragment>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}