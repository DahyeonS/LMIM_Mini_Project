import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import { Editor } from '@toast-ui/react-editor';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import service from '../service';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import Prism from 'prismjs';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

export default function Write() {
    // 라우팅 부분
    const navigate = useNavigate();

    // 입력값 처리 부분
    const [title, setTitle] = useState(''); // 제목 참조
    const [editorData, setEditorData] = useState(''); // 내용 참조
    const csrfRef = useRef(null); // CSRF 참조
    const titleRef = useRef(null); // 제목 참조
    const editorRef = useRef(null); // 에디터 참조

    // 바로 실행
    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            navigate('../');
        } else {
            service.getCsrfToken().then(
                (res) => {csrfRef.current = res.data.csrf_token;}
            )
        }
    })

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

    // 제출 처리 함수
    const editorSubmit = async(e) => {
        e.preventDefault();
        const rawData = editorData.replace('<p>', '').replace('</p>', '').replace('<br>', '');

        if (!editorData || !rawData || !title) {
            if (!title) {
                alert('제목을 입력하세요.');
                titleRef.current.focus();
            } else {
                alert('내용을 입력하세요.');
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

    // 화면 출력 부분
    return (
        <div className='container-fluid container-xl'>
            <h1 className='pb-2 ms-3 my-3 border-bottom'>글쓰기</h1>
            <input className='form-control mb-4' placeholder='제목을 입력하세요.' ref={titleRef} name='title' onChange={handleTitleChange}></input>
            <Editor previewStyle='vertical' initialEditType='wysiwyg' hooks={{addImageBlobHook: onUploadImage}}
            toolbarItems = {[['heading', 'bold', 'italic', 'strike'], ['hr', 'quote'], ['indent', 'outdent'],
                ['ul', 'ol', 'task'], ['image', 'link', 'code', 'codeblock']]}
            hideModeSwitch={true} onChange={() => {setEditorData(editorRef.current.getInstance().getHTML());}}
            ref={editorRef} plugins={[colorSyntax, [codeSyntaxHighlight, {highlighter: Prism }]]} language='ko-KR'/>
            <button onClick={editorSubmit} className='btn btn-secondary mt-4'>작성하기</button>
        </div>
    )
}