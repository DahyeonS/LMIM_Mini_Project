import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

export default function Scroll() {
    // 화면 출력용 변수
    const isMobile = UseIsMoblie();
    const hasScrolled = useScroll();

    // 스크롤 처리
    const scrollToTop = (e) => {
        e.preventDefault(); // 페이지 이동 방지

        window.scroll({
            top: 0 // 맨 위까지 끌어올림
        })
    }

    // 화면 출력 부분
    return (
        <Link className={`btn btn-outline-custom scroll-top ${isMobile ? 'px-2' : 'px-4'} ${hasScrolled && 'show'}`} onClick={scrollToTop}>
            <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' className='bi bi-chevron-bar-up mb-1' viewBox='0 0 16 16'>
                <path fillRule='evenodd' d='M3.646 11.854a.5.5 0 0 0 .708 0L8 8.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708zM2.4 5.2c0 .22.18.4.4.4h10.4a.4.4 0 0 0 0-.8H2.8a.4.4 0 0 0-.4.4z'/>
            </svg>
        </Link>
    )
}