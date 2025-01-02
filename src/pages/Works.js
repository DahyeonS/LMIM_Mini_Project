import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

// 스크롤 이벤트 핸들러
function useImgRefs() {
    const imgRefs = useRef([]); // 이미지 상태 참조

    useEffect(() => {
        const observer = new IntersectionObserver( // 스크롤 이벤트 활성화
            (entries) => { 
                entries.forEach((entry) => {
                    // 이미지 구간이 화면에 들어오면 슬라이드 효과 적용
                    if (entry.isIntersecting) entry.target.classList.add('slide-in');
                });
            }, {threshold: 0.5}); // 이미지 구간이 화면에 50% 이상 들어오면 효과 적용

        const imgRefsCurrent = imgRefs.current;

        imgRefsCurrent.forEach((img) => {
            if (img) observer.observe(img); // 모든 이미지에 슬라이드 효과 적용
        });

        return () => {
            imgRefsCurrent.forEach((img) => {
                if (img) observer.unobserve(img); // 클린업 함수 (페이지 이동 시 이벤트 제거)
            });
        };
    }, []); // 페이지가 로드될 때 한 번만 실행

    return imgRefs;
}

export default function Works() {
    // 화면 출력용 변수
    const imgRefs = useImgRefs(); // 스크롤 트리거

    const addToRefs = (el) => {
        if (el && !imgRefs.current.includes(el)) imgRefs.current.push(el);
    }; // 이미지 참조 추가

    return (
        <section className='container-fluid container-xl px-5 rounded'>
            <div className='pt-5 mb-5 border-bottom'>
                <h1 className='pt-5 text-secondary fw-bold fst-italic'>Works</h1>
            </div>
            <div className='pb-5 mt-5'>
                <div className='pb-5 border-bottom'>
                    <h2 className='fw-bold opacity-75'>경기도 중복 민원 판별 및 부서 분류 모델 <Link className='text-secondary' to={'https://github.com/ohjiae/Gyeonggi-do_Civil_Complaints_board_Analysis'} target='_blank'><svg className='pb-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"/></svg></Link></h2>
                    <h4 className='text-secondary fst-italic opacity-75 mt-3'>2021.07.27 ~ 2021.08.19</h4>
                    <img ref={addToRefs} className='mt-5 img-custom img-slide' src='./load_image?type=static&name=works1.png' alt='works1'/>
                    <h5 className='my-4'>국민신문고 경기도 민원 데이터 분석 프로젝트</h5>
                    <ul className='mb-4 fs-5'>
                        <li>
                            <h5><span className='fw-bold me-3'>진행 기관</span>아이티윌</h5>
                        </li>
                        <li>
                            <h5><span className='fw-bold me-3'>인원</span>4인</h5>
                        </li>
                        <li>
                            <h5><span className='fw-bold me-3'>상세역할</span>데이터 라벨링 및 Decision Tree 모델링</h5>
                        </li>
                    </ul>
                    <h5>국민신문고에서 약 17,000개의 경기도 민원을 크롤링하여 수집하여 중복 민원 직접 라벨링</h5>
                    <h5>KoNLP 패키지를 이용해 크롤링한 민원의 형태소를 분석하여 부서의 대표 키워드들과 비교해 코사인 유사도가 높은 부서를 추출</h5>
                    <h5>중복 민원 여부 판별 및 개별 민원의 답변 부서를 추천하는 모델 생성 - Naive Bayes, SVM, Decision Tree, Random Forest</h5>
                </div>
                <div className='py-5 border-bottom'>
                    <h2 className='fw-bold opacity-75'>맑음돌이 <Link className='text-secondary' to={'https://github.com/DahyeonS/Teruterubouz_Project'} target='_blank'><svg className='pb-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"/></svg></Link></h2>
                    <h4 className='text-secondary fst-italic opacity-75 mt-3'>2023.10.20 ~ 2023.11.20</h4>
                    <div className='row'>
                        <div className='col-lg-5 mt-5'>
                            <img ref={addToRefs} className='img-custom-grid img-slide' src='./load_image?type=static&name=works2.jpg' alt='works2'/>
                        </div>
                        <div className='col-lg-5 mt-5'>
                            <img ref={addToRefs} className='img-custom-grid img-slide' src='./load_image?type=static&name=works3.jpg' alt='works3'/>
                        </div>
                        <div className='col-lg-5 mt-5'>
                            <img ref={addToRefs} className='img-custom-grid img-slide' src='./load_image?type=static&name=works4.jpg' alt='works4'/>
                        </div>
                        <div className='col-lg-5 mt-5'>
                            <img ref={addToRefs} className='img-custom-grid img-slide' src='./load_image?type=static&name=works5.jpg' alt='works5'/>
                        </div>
                        <div className='col-lg-5 mt-5'>
                            <img ref={addToRefs} className='img-custom-grid img-slide' src='./load_image?type=static&name=works6.jpg' alt='works6'/>
                        </div>
                        <div className='col-lg-5 mt-5'>
                            <img ref={addToRefs} className='img-custom-grid img-slide' src='./load_image?type=static&name=works7.jpg' alt='works7'/>
                        </div>
                    </div>
                    <h5 className='my-4'>Spring + Flask 기반 날씨 커뮤니티 웹사이트 개발 프로젝트</h5>
                    <ul className='mb-4 fs-5'>
                        <li>
                            <h5><span className='fw-bold me-3'>진행 기관</span>더조은컴퓨터에듀</h5>
                        </li>
                        <li>
                            <h5><span className='fw-bold me-3'>인원</span>1인</h5>
                        </li>
                    </ul>
                    <h5>기상청 API를 연동한 일기 예보 시스템 구현</h5>
                    <h5>기상청 제공 데이터를 기반으로 한 날씨 예측 모델(Random Forest, SVM) 개발</h5>
                    <h5>MySQL과 MyBatis를 연동해 이미지 파일을 업로드 가능한 커뮤니티 게시판 구현</h5>
                </div>
                <div className='pt-5'>
                    <h2 className='fw-bold opacity-75'>목장쉼터 <Link className='text-secondary' to={'https://github.com/DahyeonS/Farm_Shelter_Project'} target='_blank'><svg className='pb-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"/></svg></Link></h2>
                    <h4 className='text-secondary fst-italic opacity-75 mt-3'>2024.1.15 ~ 2024.2.29</h4>
                    <div className='row'>
                        <div className='col-lg-5 mt-5'>
                            <img ref={addToRefs} className='img-custom-grid img-slide' src='./load_image?type=static&name=works8.JPG' alt='works8'/>
                        </div>
                        <div className='col-lg-5 mt-5'>
                            <img ref={addToRefs} className='img-custom-grid img-slide' src='./load_image?type=static&name=works9.JPG' alt='works9'/>
                        </div>
                        <div className='col-lg-5 mt-5'>
                            <img ref={addToRefs} className='img-custom-grid img-slide' src='./load_image?type=static&name=works10.JPG' alt='works10'/>
                        </div>
                        <div className='col-lg-5 mt-5'>
                            <img ref={addToRefs} className='img-custom-grid img-slide' src='./load_image?type=static&name=works11.JPG' alt='works11'/>
                        </div>
                        <div className='col-lg-5 mt-5'>
                            <img ref={addToRefs} className='img-custom-grid img-slide' src='./load_image?type=static&name=works12.JPG' alt='works12'/>
                        </div>
                        <div className='col-lg-5 mt-5'>
                            <img ref={addToRefs} className='img-custom-grid img-slide' src='./load_image?type=static&name=works13.JPG' alt='works13'/>
                        </div>
                    </div>
                    <h5 className='my-4'>Django 기반 낙농체험 목장 홍보 웹사이트 개발 프로젝트</h5>
                    <ul className='mb-4 fs-5'>
                        <li>
                            <h5><span className='fw-bold me-3'>진행 기관</span>더조은컴퓨터에듀</h5>
                        </li>
                        <li>
                            <h5><span className='fw-bold me-3'>인원</span>3인 (BE 1인, FE 2인)</h5>
                        </li>
                        <li>
                            <h5><span className='fw-bold me-3'>상세역할</span>모델링 및 백엔드 개발, 프로젝트 총괄</h5>
                        </li>
                    </ul>
                    <h5>이미지 업로드를 통해 치즈 종류를 구분하는 Tensorflow 기반 알고리즘 개발</h5>
                    <h5>Folium 패키지를 이용한 낙농체험 목장 지도 시각화</h5>
                    <h5>SQLite를 활용해 리뷰 등록, 질문/답변이 가능한 목장 투어 신청 페이지 구현</h5>
                    <h5>카카오페이 결제 및 이메일 전송 기능을 갖춘 목장 투어 예약 시스템</h5>
                    <h5>VirtualBox Ubuntu 가상환경 기반 서버에 사이트 배포</h5>
                </div>
            </div>
        </section>
    );
}