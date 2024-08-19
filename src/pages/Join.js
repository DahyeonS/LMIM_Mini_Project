import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import { useEffect, useState } from 'react';
import service from '../service';

export default function Join() {
    const [data, setData] = useState({});

    useEffect(() => {
        service.loadUser().then(
            (res) => {
                setData(res.data);
            }
        )
    }, []) // 한 번만 실행


    // 화면 출력 부분
    return (
        <div className="container-fluid container-xl">
            <h1 className='pb-2 ms-3 my-3 border-bottom'>회원가입</h1>
            {(data.rs < 1) ? (
                <form>
                <div className='mb-3'>
                    <label for='id'>아이디</label>
                    <input type='text' id='id' className='form-control' name='id'></input>
                </div>
                <div className='mb-3'>
                    <label for='pw'>비밀번호</label>
                    <input type='password' id='pw' className='form-control' name='pw'></input>
                </div>
                <div className='mb-3'>
                    <label for='pw2'>비밀번호 확인</label>
                    <input type='password' id='pw2' className='form-control' name='pw2'></input>
                </div>
                <div className='mb-3'>
                    <label for='email'>이메일</label>
                    <input type='email' id='email' className='form-control' name='email'></input>
                </div>
                <div>
                    <input type='submit' className='btn btn-secondary w-100 py-2' value={'가입하기'}></input>
                </div>
            </form>
            ) : (
                <div>
                    <h3>가입할 수 없습니다.</h3>
                </div>
            )}
        </div>
    );
}