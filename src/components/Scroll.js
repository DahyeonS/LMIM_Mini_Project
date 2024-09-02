import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    }, []);

    return [hasScrolled];
}

export default function Scroll() {
    // 화면 출력용 변수
    const [hasScrolled] = useScroll();

    // 스크롤 처리
    const scrollToTop = () => {
        window.scroll({
            top: 0 // 맨 위까지 끌어올림
        })
    }

    // 화면 출력 부분
    return (
        <Link className={`btn btn-outline-custom px-4 scroll-top ${hasScrolled && 'show'}`} onClick={scrollToTop}>
            <svg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='currentColor' className='bi bi-chevron-bar-up mb-1' viewBox='0 0 16 16'>
                <path fill-rule='evenodd' d='M3.646 11.854a.5.5 0 0 0 .708 0L8 8.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708zM2.4 5.2c0 .22.18.4.4.4h10.4a.4.4 0 0 0 0-.8H2.8a.4.4 0 0 0-.4.4z'/>
            </svg>
        </Link>
    )
}