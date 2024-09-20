import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import { Editor } from '@toast-ui/react-editor';
import { useEffect, useState, useRef, Fragment } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import service from '../service';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

// 로그인 확인
function useLoginCheck(navigate) {
    useEffect(() => {
        if (!localStorage.getItem('token')) navigate('../'); // 비로그인 차단(페이지 이동)
    }, [navigate]) // 한 번만 실행
}

// 저장된 데이터 로드
function useData(index) {
    const [title, setTitle] = useState(''); // 불러온 제목 데이터 상태 반영
    const [tag, setTag] = useState([]); // 불러온 태그 데이터 상태 반영
    
    // 바로 실행
    useEffect(() => {
        if (index === 0) return; // 수정 시에만 작동
        service.loadUpdatePost(index).then(
            (res) => {
                setTitle(res.data.title); // 불러온 제목 데이터 저장
                if (res.data.tag) setTag((res.data.tag).split(' ')); // 불러온 태그 데이터 저장
            }
        )
    }, [index]) // 페이지가 로드될 때 한 번만 실행

    return [title, setTitle, tag, setTag];
}

function useEditorData(index) {
    const [editorData, setEditorData] = useState(''); // 내용 반영

    useEffect(() => {
        if (index === 0) return; // 수정 시에만 작동
        service.loadUpdatePost(index).then(
            (res) => {setEditorData(res.data.content);}
        )
    }, [index]) // 페이지가 로드될 때 한 번만 실행

    return [editorData, setEditorData];
}

function useCsrfToken() {
    const csrfRef = useRef(null); // CSRF 참조

    useEffect(() => {
        service.getCsrfToken().then(
            (res) => {csrfRef.current = res.data.csrf_token;}
        )
    }, []) // 페이지가 로드될 때 한 번만 실행

    return csrfRef;
}

function useEditorRef(index, editorData) { // 불러온 내용을 실제 에디터에 적용
    const editorRef = useRef(null); // 에디터 참조
    const hasSetHTML = useState(false); // 수정 데이터 적용 여부

    useEffect(() => {
        if (index === 0 || hasSetHTML.current) return; // 수정 시 단 한 번만 작동
        editorRef.current.getInstance().setHTML(editorData); // 에디터 데이터 설정
        hasSetHTML.current = true; // 데이터 적용 여부 설정
    }, [index, editorData, hasSetHTML]); // 페이지가 로드될 때 한 번만 실행

    return editorRef;
}

export default function Write() {
    // 라우팅 부분
    const navigate = useNavigate();
    useLoginCheck(navigate);

    // 출력값 처리 부분
    const location = useLocation(null); // 현재 페이지 위치 추출
    const index = location.state ? location.state.idx : 0; // 현제 페이지 번호 추출

    // 입력값 처리 부분
    const [title, setTitle, tag, setTag] = useData(index);
    const [editorData, setEditorData] = useEditorData(index);
    const [inputTag, setInputTag] = useState(''); // 태그 입력값 반영

    const csrfRef = useCsrfToken();
    const titleRef = useRef(null); // 제목 참조
    const editorRef = useEditorRef(index, editorData);

    // 제목 입력값 갱신
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // 태그 입력값 갱신
    const handleTagChange = (e) => {
        const regex = /[^\wㄱ-ㅎ가-힣]/;

        if (regex.test(e.target.value)) {
            alert('_를 제외한 특수문자는 입력할 수 없습니다.');
            return;
        }

        setInputTag(e.target.value);
    };

    // 태그 추가
    const handleTagKeyDown = (e) => {
        if (e.target.id !== 'tag') return;

        if (e.key === 'Enter' || e.key === ' ' || e.key === ',') {
            e.preventDefault();

            if (inputTag && inputTag !== ',' && tag.length <= 9 && !tag.includes(inputTag)) setTag(tag.concat(inputTag));
            else if (tag.length > 9) {
                alert('태그는 10개까지 추가할 수 있습니다.');
                return;
            } else if (tag.includes(inputTag)) {
                alert('중복되는 태그입니다.');
                return;
            }
            
            setInputTag('');
        }
    };

    // 태그 제거
    const onDeleteTag = (str) => {
        setTag(tag.filter((t) => t !== str));
    }

    // 이미지 업로드
    const onUploadImage = async(blob, callback) => {
        let formData = new FormData();
        formData.append('image', blob); // 전송할 실제 파일을 담음

        service.uploadImage(formData, csrfRef.current).then(
            (res) => {
                const url = `./post/load_image?type=temp&name=${res.data.name}`; // 실제 이미지가 저장된 URL
                callback(url, blob.name); // 콜백 함수로 리턴값을 에디터에 적용하여 팝업 창 종료
            }
        )
    }

    // 작성 취소
    const handleCancel = () => {
        if (window.confirm('정말로 취소하시겠습니까?')) navigate('/post');
    }

    // 수정 취소
    const handleUpdateCancel = (index) => {
        if (window.confirm('정말로 취소하시겠습니까?')) navigate('/view', {state:{idx:index}});
    }

    // 제출 처리 함수
    const editorSubmit = async(e) => {
        e.preventDefault(); // 페이지 변경 방지
        const rawData = editorData.replace('<p>', '').replace('</p>', '').replace('<br>', '');

        // 빈 공간이 있을 시 전송 X
        if (!editorData || !rawData || !title) {
            if (!title) {
                alert('제목을 입력해주세요.');
                titleRef.current.focus(); // 제목에 포커스
            } else {
                alert('내용을 입력해주세요.');
            }
            return;
        }
        
        // 페이지 로딩이 완료된 후 실행
        await service.createPost({title, tag, content:editorData}, csrfRef.current).then(
            (res) => {
                if (res.data.rs === 1) {
                    alert('게시물이 작성되었습니다.');
                    navigate('/view', {state:{idx:res.data.idx}});
                }
            }
        )
    }
    
    // 수정 처리 함수
    const editorUpdate = async(e) => {
        e.preventDefault(); // 페이지 변경 방지
        const rawDataUpdate = editorData.replace('<p>', '').replace('</p>', '').replace('<br>', '');
    
        // 빈 공간이 있을 시 전송 X
        if (!editorData || !rawDataUpdate || !title) {
            if (!title) {
                alert('제목을 입력하세요.');
                titleRef.current.focus(); // 제목 포커스
            } else {
                alert('내용을 입력하세요.');
            }
            return;
        }
        
        // 페이지 로딩이 완료된 후 실행
        await service.updatePost({idx:index, title, tag, content:editorData}, csrfRef.current).then(
            (res) => {
                if (res.data.rs === 1) {
                    alert('게시물이 수정되었습니다.');
                    navigate('/view', {state:{idx:index}});
                }
            }
        )
    }

    // 화면 출력 부분
    return (
        <section className='container-fluid container-xl px-5'>
            <div className='pt-5 border-bottom'>
                <h1 className='pt-5 text-secondary fw-bold fst-italic'>글쓰기</h1>
            </div>
            <input className='form-control mt-5 mb-4' placeholder='제목을 입력하세요.' ref={titleRef} name='title' onChange={handleTitleChange} value={title || ''} maxLength={40}/>
            <Editor previewStyle='vertical' initialEditType='wysiwyg' hooks={{addImageBlobHook: onUploadImage}} maxLength={2000}
            toolbarItems = {[['heading', 'bold', 'italic', 'strike'], ['hr', 'quote'], ['indent', 'outdent'],
                ['ul', 'ol', 'task'], ['image', 'link', 'code', 'codeblock']]} initialValue={editorData}
            hideModeSwitch={true} onChange={() => setEditorData(editorRef.current.getInstance().getHTML())}
            ref={editorRef} plugins={[colorSyntax, [codeSyntaxHighlight, {highlighter: Prism }]]} language='ko-KR'/>
            <div className='mt-3 mb-4 row'>
                <div className='col-md-5 col-lg-3'>
                    <label htmlFor='tag' className='mb-1 text-secondary fst-italic'>태그</label>
                    <input id='tag' name='tag' className='form-control' onChange={handleTagChange} value={inputTag} onKeyDown={handleTagKeyDown} maxLength={20}/>
                </div>
                <div className='col-md-7 col-lg-9 mt-4'>
                    {tag && tag.map((t, index) => 
                        <span key={`tag-${index}`} className='fw-bold bg-custom fs-5 mt-1 me-3 fst-italic'>{t} <Link className='text-secondary' onClick={(e) => {e.preventDefault(); onDeleteTag(t);}}>X</Link></span>
                    )}
                </div>
            </div>
            <div className='mt-2 pb-5 row'>
                {index > 0 ? ( // 수정 중
                    <Fragment>
                        <div className='col-4 col-md-2'>
                            <button className='btn btn-primary' onClick={() => handleUpdateCancel(index)}>취소</button>
                        </div>
                        <div className='col-3 col-md-8'/>
                        <div className='col-5 col-md-2'>
                            <button onClick={editorUpdate} className='btn btn-primary float-end'>수정하기</button>
                        </div>
                    </Fragment>
                ) : ( // 작성 중
                    <Fragment>
                        <div className='col-4 col-md-2'>
                            <button className='btn btn-primary' onClick={handleCancel}>취소</button>
                        </div>
                        <div className='col-3 col-md-8'/>
                        <div className='col-5 col-md-2'>
                            <button onClick={editorSubmit} className='btn btn-primary float-end'>작성하기</button>
                        </div>
                    </Fragment>
                )}
            </div>
        </section>
    )
}