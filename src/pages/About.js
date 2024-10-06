import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'

export default function About() {
    return (
        <section className='container-fluid container-xl px-5 rounded'>
            <div className='pt-5 mb-5 border-bottom'>
                <h1 className='pt-5 text-secondary fw-bold fst-italic'>About {'{Me};'}</h1>
            </div>
            <div className='pb-5 mt-4'>
                <ul className='fs-4'>
                    <li><h4><span className='fw-bold me-3'>이름</span>서 다현</h4></li>
                    <li>
                        <h4 className='fw-bold'>경력 사항</h4>
                        <ul className='mb-3'>
                            <li><h5>미래내일 일경험 인턴<span className='text-secondary fst-italic opacity-75 ms-2'>(비엠더코리아, 2024.10.07 ~ )</span></h5></li>
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