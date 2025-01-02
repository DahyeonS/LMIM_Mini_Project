import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

// 스크롤 이벤트 핸들러
function useUlRefs() {
    const ulRefs = useRef(null); // 글머리 상태 참조

    useEffect(() => {
        const observer = new IntersectionObserver( // 스크롤 이벤트 활성화
            (entries) => { 
                entries.forEach((entry) => {
                    // 글머리 구간이 화면에 들어오면 슬라이드 효과 적용
                    if (entry.isIntersecting) entry.target.classList.add('slide-in');
                });
            }, {threshold: 0.5}); // 글머리 구간이 화면에 50% 이상 들어오면 효과 적용

        const ulRefCurrent = ulRefs.current;

        if (ulRefCurrent) observer.observe(ulRefCurrent); // 모든 글머리에 슬라이드 효과 적용

        return () => {
            if (ulRefCurrent) observer.unobserve(ulRefCurrent); // 클린업 함수 (페이지 이동 시 이벤트 제거)
        };
    }, []); // 페이지가 로드될 때 한 번만 실행

    return ulRefs;
}

export default function About() {
    const ulRefs = useUlRefs(); // 스크롤 트리거

    return (
        <section className='container-fluid container-xl px-5 rounded'>
            <div className='pt-5 mb-5 border-bottom'>
                <h1 className='pt-5 text-secondary fw-bold fst-italic'>About {'{Me};'}</h1>
            </div>
            <div className='pb-5 mt-4'>
                <ul ref={ulRefs} className='fs-4 ul-custom'>
                    <li><h4><span className='fw-bold me-3'>이름</span>서 다현 <Link className='text-secondary ms-1' to={'https://www.linkedin.com/in/dahyeon-seo-53b101342/'} target='_blank'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M18.3362 18.339H15.6707V14.1622C15.6707 13.1662 15.6505 11.8845 14.2817 11.8845C12.892 11.8845 12.6797 12.9683 12.6797 14.0887V18.339H10.0142V9.75H12.5747V10.9207H12.6092C12.967 10.2457 13.837 9.53325 15.1367 9.53325C17.8375 9.53325 18.337 11.3108 18.337 13.6245V18.339H18.3362ZM7.00373 8.57475C6.14573 8.57475 5.45648 7.88025 5.45648 7.026C5.45648 6.1725 6.14648 5.47875 7.00373 5.47875C7.85873 5.47875 8.55173 6.1725 8.55173 7.026C8.55173 7.88025 7.85798 8.57475 7.00373 8.57475ZM8.34023 18.339H5.66723V9.75H8.34023V18.339ZM19.6697 3H4.32923C3.59498 3 3.00098 3.5805 3.00098 4.29675V19.7033C3.00098 20.4202 3.59498 21 4.32923 21H19.6675C20.401 21 21.001 20.4202 21.001 19.7033V4.29675C21.001 3.5805 20.401 3 19.6675 3H19.6697Z"/></svg></Link></h4></li>
                    <li>
                        <h4 className='fw-bold'>경력 사항</h4>
                        <ul className='mb-3'>
                            <li><h5>미래내일 일경험 인턴<span className='text-secondary fst-italic opacity-75 ms-2'>(비엠더코리아, 2024.10.07 ~ 2024.12.27)</span></h5></li>
                            <li><h5>서울시 뉴딜일자리 전통시장 매니저<span className='text-secondary fst-italic opacity-75 ms-2'>(목사랑시장, 2022.02.14 ~ 2022.08.01)</span></h5></li>
                        </ul>
                    </li>
                    <li>
                        <h4 className='fw-bold'>훈련 수료 이력</h4>
                        <ul className='mb-3'>
                            <li><h5>빅데이터분석(with 파이썬)과 엘라스틱서치를 활용한 자바(Java)웹개발자양성<span className='text-secondary fst-italic opacity-75 ms-2'>(더조은컴퓨터에듀, 2023.07.24 ~ 2024.03.07)</span></h5></li>
                            <li><h5>파이썬과 R을 활용한 빅데이터 분석 및 시각화 전문가 양성과정-A<span className='text-secondary fst-italic opacity-75 ms-2'>(아이티윌, 2021.04.15 ~ 2021.08.19)</span></h5></li>
                            <li><h5>디지털영상콘텐츠편집(프리미어+애프터이펙트)B<span className='text-secondary fst-italic opacity-75 ms-2'>(하이미디어아카데미 인재개발원, 2020.12.31 ~ 2021.02.23)</span></h5></li>
                        </ul>
                    </li>
                    <li>
                        <h4 className='fw-bold'>자격 사항</h4>
                        <ul className='mb-3'>
                            <li>
                                <h5>SQL 개발자<span className='text-secondary fst-italic opacity-75 ms-2'>(한국데이터산업진흥원, 2023.10.06)</span></h5>
                            </li>
                            <li>
                                <h5>빅데이터분석기사<span className='text-secondary fst-italic opacity-75 ms-2'>(한국데이터산업진흥원, 2022.12.23)</span></h5>
                            </li>
                            <li>
                                <h5>데이터분석준전문가<span className='text-secondary fst-italic opacity-75 ms-2'>(한국데이터산업진흥원, 2022.11.25)</span></h5>
                            </li>
                            <li>
                                <h5>워드프로세서<span className='text-secondary fst-italic opacity-75 ms-2'>(한국데이터산업진흥원, 2022.01.28)</span></h5>
                            </li>
                            <li>
                                <h5>컴퓨터활용능력 1급<span className='text-secondary fst-italic opacity-75 ms-2'>(한국데이터산업진흥원, 2020.08.28)</span></h5>
                            </li>
                        </ul>
                        <li><h4 className='fw-bold'>English, 日本語 OK</h4></li>
                    </li>
                </ul>
            </div>
        </section>
    );
}