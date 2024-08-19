import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { useState, useRef, useEffect } from 'react';
import service from '../service';
import { Link, useLocation } from 'react-router-dom';

export default function Board() {
    // 파라미터 처리
    const location = useLocation();

    // 입력값 처리 부분
    const [data, setData] = useState({}); // 불러온 데이터 상태 관리
    const [values, setValues] = useState(''); // 입력값 반영
    const [password, setPassword] = useState({}); // 비밀번호 입력값 반영
    const [showPasswordInput, setShowPasswordInput] = useState(null); // 비밀번호 입력 필드

    const inputNameFocus = useRef(null); // 유저명 참조
    const inputPwFocus = useRef(null); // 비밀번호 참조
    const inputContentFocus = useRef(null); // 내용 참조
    const inputDeletePwFocus = useRef(null); // 방명록 삭제 비밀번호 참조

    // 저장된 데이터 로드
    useEffect(() => { // 페이지 로드 시 실행
        const queryParams = new URLSearchParams(location.search);
        const page = queryParams.get('page');

        service.getBoard(page).then( // 플라스크에서 데이터를 가져옴
            (res) => { // 응답이 성공했을 때
                setData(res.data); // 응답받은 값을 data에 저장
            }, (error) => { // 응답이 실패했을 때
                console.log('못 찾겠다 꾀꼬리');
            }
        )
    }, [location.search]) // 주소가 변경될 때마다 실행

    // 입력값이 변경될 때마다 자동으로 상태를 반영
    const handleChange = (e) => {
        const {name, value} = e.target; // 입력값의 name, value 추출
        setValues((prevValues) => ({ // values의 값을 갱신
            ...prevValues, // 이전에 입력된 값을 복사
            [name]: value, // 새로운 값을 추가하거나 갱신된 값을 적용
        }))
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        // 빈 공간이 있을 시 전송 X
        if ((!values.username) || (!values.password) || (!values.content)) {
            if (!values.username) {
                alert('이름을 입력해주세요.');
                inputNameFocus.current.focus(); // 유저명에 포커스
            }
            else if (!values.password) {
                alert('비밀번호를 입력해주세요.');
                inputPwFocus.current.focus(); // 비밀번호에 포커스
            }
            else {
                alert('내용을 입력해주세요.');
                inputContentFocus.current.focus(); // 내용에 포커스
            }
            
            return false;
        }

        // DB 저장 함수 호출
        service.createBoard(values).then(
            (res) => { // 응답이 성공했을 때
                if (res.data.rs === 1) { // 응답받은 값의 rs가 1일 때
                    alert('방명록이 작성되었습니다.');
                    window.location.reload(); // 새로고침
                }
            }
        )
    };

    const handlsShowPasswordInput = (idx) => {
        setShowPasswordInput(idx);
        setPassword('');
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleDelete = (idx) => {
        service.deleteBoard(idx, password).then(
            (res) => {
                if (res.data.rs === 1) {
                    alert('정상적으로 삭제되었습니다.');
                    window.location.reload();
                } else {
                    alert('비밀번호를 올바르게 입력하세요.');
                    inputDeletePwFocus.current.focus();
                }
            }
        )
    }

    // 화면 출력 부분
    return (
        <div className="container-fluid container-xl">
            <h1 className='pb-2 ms-3 my-3 border-bottom'>방명록</h1>
            <form className='row g-2' onSubmit={handleSubmit} method='post'>
                <div className='col-6'>
                    <input type='text' className='form-control' name='username' placeholder='Name' onChange={handleChange} ref={inputNameFocus}></input>
                </div>
                <div className='col-6'>
                    <input type='password' className='form-control' name='password' placeholder='Password' onChange={handleChange} ref={inputPwFocus}></input>
                </div>
                <div className='col-12'>
                    <input type='text' className='form-control py-5' name='content' onChange={handleChange} ref={inputContentFocus}></input>
                </div>
                <div className='col-10'></div>
                <div className='col-2'>
                    <input type='submit' className='btn btn-secondary w-100 py-2' value={'작성'}></input>
                </div>
            </form>
            {Array.isArray(data.items) ? (
                <div className='py-3'>
                    {data.items.map((item) => (
                        <div key={item.idx} className='row g-3 my-3'>
                            <div className='col-4'>{item.username}</div>
                            <div className='col-4'>{item.content}</div>
                            {/* 삭제 버튼 */}
                            {}
                            {showPasswordInput === item.idx ? (
                                <>
                                <div className='col-1'></div>
                                <div className='col-2'>
                                    <input type='password' onChange={handlePasswordChange} className='form-control' placeholder='비밀번호 확인' ref={inputDeletePwFocus}></input>
                                </div>
                                <button onClick={() => handleDelete(item.idx)} className='btn btn-secondary col-1'>삭제</button>
                                </>
                            ) : (
                                <>
                                <div className='col-3'></div>
                                <button className='btn btn-secondary col-1' onClick={() => handlsShowPasswordInput(item.idx)}>삭제</button>
                                </>
                            )}
                        </div>
                    ))}
                    <ul className='pagination justify-content-center py-5'>
                        {(data.hasPrev) ? (
                            <li className='page-item'>
                                <Link className='page-link text-secondary' to={`?page=${data.prevNum}`}>이전</Link>
                            </li>
                        ) : (
                            <li className='page-item disabled'>
                                <Link className='page-link' to={()=>false} aria-disabled='true'>이전</Link>
                            </li>
                        )}
                        {data.iterPages.map((pageNum) => (
                            <>
                            {(pageNum !== null) ? (
                                <>
                                {(pageNum !== data.page) ? (
                                    <li className='page-item' key={pageNum}>
                                        <Link className='page-link text-secondary' to={`?page=${pageNum}`}>{pageNum}</Link>
                                    </li>
                                ) : (
                                    <li className='page-item active' aria-current="page" key={pageNum}>
                                        <Link className='page-link bg-secondary' tabIndex={-1} to={()=>false}>{pageNum}</Link>
                                    </li>                            
                                )}
                                </>
                            ) : (
                                <li className='disabled' key={pageNum}>
                                    <Link className='page-link' to={()=>false}>...</Link>
                                </li>
                            )}
                            </>
                        ))}
                        {(data.hasNext) ? (
                            <li>
                                <Link className='page-link text-secondary' to={`?page=${data.nextNum}`}>다음</Link>
                            </li>
                        ) : (
                            <li className='page-item disabled'>
                                <Link className='page-link' to={()=>false} tabIndex={-1} aria-disabled='true'>다음</Link>
                            </li>
                        )}
                    </ul>
                </div>
            ) : (
                <div className='text-center fw-bold'>데이터가 아직 로드되지 않았습니다.</div>
            )}
        </div>
    );
}

