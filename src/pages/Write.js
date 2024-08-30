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
import { useLocation, useNavigate } from 'react-router-dom';
import service from '../service';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

function useLoginCheck(navigate) {
    useEffect(() => {
        if (localStorage.getItem('token') === null) navigate('../');
    }, [navigate])
}

// 저장된 데이터 로드
function useTitle(index) {
    const [title, setTitle] = useState('');
    
    // 바로 실행
    useEffect(() => {
        if (index === 0) return;
        service.loadUpdatePost(index).then(
            (res) => {
                setTitle(res.data.title);
            }
        )
    }, [index])

    return [title, setTitle];
}

function useEditorData(index) {
    const [editorData, setEditorData] = useState(''); // 내용 반영

    useEffect(() => {
        if (index === 0) return;
        service.loadUpdatePost(index).then(
            (res) => {setEditorData(res.data.content);}
        )
    }, [index])

    return [editorData, setEditorData];
}

function useCsrfToken() {
    const csrfRef = useRef(null); // CSRF 참조

    useEffect(() => {
        service.getCsrfToken().then(
            (res) => {csrfRef.current = res.data.csrf_token;}
        )
    }, [])

    return csrfRef;
}

function useEditorRef(editorData) {
    const editorRef = useRef(null); // 에디터 참조

    useEffect(() => {
        if (!editorData) return;
        editorRef.current.getInstance().setHTML(editorData); // 에디터 데이터 설정
    }, [editorData]);

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
    const [title, setTitle] = useTitle(index);
    const [editorData, setEditorData] = useEditorData(index);

    const csrfRef = useCsrfToken();
    const titleRef = useRef(null); // 제목 참조
    const editorRef = useEditorRef(editorData);

    // 제목 입력값 반영
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    };

    // 이미지 업로드
    const onUploadImage = async(blob, callback) => {
        let formData = new FormData();
        formData.append('image', blob);

        service.uploadImage(formData, csrfRef.current).then(
            (res) => {
                const url = `./post/load_image?type=${res.data.type}&name=${res.data.name}`;

                service.loadImage(res.data.type, res.data.name).then(
                    (res) => {callback(url, blob.name);}
                )
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
        e.preventDefault();
        const rawData = editorData.replace('<p>', '').replace('</p>', '').replace('<br>', '');

        if (!editorData || !rawData || !title) {
            if (!title) {
                alert('제목을 입력해주세요.');
                titleRef.current.focus();
            } else {
                alert('내용을 입력해주세요.');
            }
            return false
        }
        
        await service.createPost({title, content:editorData}, csrfRef.current).then(
            (res) => {
                if (res.data.rs === 1) {
                    alert('게시물이 작성되었습니다.');
                    navigate('/post')
                }
            }
        )
    }
    
    // 수정 처리 함수
    const editorUpdate = async(e) => {
        e.preventDefault();
        const rawDataUpdate = editorData.replace('<p>', '').replace('</p>', '').replace('<br>', '');
    
        if (!editorData || !rawDataUpdate || !title) {
            if (!title) {
                alert('제목을 입력하세요.');
                titleRef.current.focus();
            } else {
                alert('내용을 입력하세요.');
            }
            return false
        }
        
        await service.updatePost({idx:index, title, content:editorData}, csrfRef.current).then(
            (res) => {
                if (res.data.rs === 1) {
                    alert('게시물이 수정되었습니다.');
                    navigate('/post')
                }
            }
        )
    }

    // 화면 출력 부분
    return (
        <section className='container-fluid container-xl'>
            <h1 className='pb-2 ms-3 my-3 border-bottom'>글쓰기</h1>
            <input className='form-control mb-4' placeholder='제목을 입력하세요.' ref={titleRef} name='title' onChange={handleTitleChange} value={title || ''}/>
            <Editor previewStyle='vertical' initialEditType='wysiwyg' hooks={{addImageBlobHook: onUploadImage}}
            toolbarItems = {[['heading', 'bold', 'italic', 'strike'], ['hr', 'quote'], ['indent', 'outdent'],
                ['ul', 'ol', 'task'], ['image', 'link', 'code', 'codeblock']]} initialValue={editorData} placeholder={''}
            hideModeSwitch={true} onChange={() => {setEditorData(editorRef.current.getInstance().getHTML());}}
            ref={editorRef} plugins={[colorSyntax, [codeSyntaxHighlight, {highlighter: Prism }]]} language='ko-KR'/>
            <div className='mt-4'>
                {index > 0 ? (
                    <Fragment>
                        <button onClick={editorUpdate} className='btn btn-primary'>수정하기</button>
                        <button className='btn btn-primary ms-2' onClick={() => handleUpdateCancel(index)}>취소</button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <button onClick={editorSubmit} className='btn btn-primary'>작성하기</button>
                        <button className='btn btn-primary ms-2' onClick={handleCancel}>취소</button>
                    </Fragment>
                )}
            </div>
        </section>
    )
}