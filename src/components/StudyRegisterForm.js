import React, { useState } from 'react'
import styled from 'styled-components'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'antd';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { registerStudyApi } from '../api/studyApi';
import { uploadImageApi } from '../api/fileApi';
import Cookies from 'universal-cookie';

function StudyForm() {
    const cookies = new Cookies();
    const jwtToken = cookies.get('jwtToken');
    const memberName = cookies.get('memberName');

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [notiDate, setNotiDate] = useState("0");

    const editorRef = React.useRef();

    const onTitleInputHandler = (e) => { setTitle(e.currentTarget.value); }
    const onCategoryInputHandler = (e) => { setCategory(e.currentTarget.value); }
    const onNotiDateInputHandler = (e) => { setNotiDate(e.target.value); }

    const onSubmitHandler = () => {
        const editorInstance = editorRef.current.getInstance();

        if(title === ""){
            alert('제목을 입력해주세요.');
            document.getElementsByName("title")[0].focus();
            window.scrollTo(0,0);
            return false;
        } 

        if(category === ""){
            alert('분류를 입력해주세요.');
            document.getElementsByName("category")[0].focus();
            window.scrollTo(0,0);
            return false;
        } 

        if(notiDate === "0"){
            alert('복습일을 선택해주세요.');
            document.getElementsByName("notiDate")[0].focus();
            window.scrollTo(0,0);
            return false;
        } 

        if(editorInstance.getMarkdown() === ""){
            alert('내용을 입력하세요.');
            return false;
        }

        const requestBody = {
            title: title,
            category: category,
            notiDate: notiDate,
            content: editorInstance.getMarkdown(),
            nickname: memberName
        }

        registerStudyApi(requestBody, jwtToken);
    }

    const onListHandler = async() => {
        window.location.href = "/studyList"
    }

    function Notification(){
        return (
            <FloatingLabel controlId="floatingSelect" label="복습일 선택" className="mb-3">
                <Form.Select name="notiDate" onChange={onNotiDateInputHandler} value={notiDate} aria-label="">
                    <option value="0">---복습일 선택---</option>
                    <option value="1">3일 후 알림</option>
                    <option value="2">일주일 후 알림</option>
                    <option value="3">이주일 후 알림</option>
                    <option value="4">한 달 후 알림</option>
                    <option value="5">두 달 후 알림</option>
                    <option value="6">세 달 후 알림</option>
                </Form.Select>
            </FloatingLabel>
        );
    }

    const onUploadImage = async(blob, callback) => {
        // 1. 첨부된 이미지 파일을 서버로 전송 후, 이미지 경로 url을 받아온다
        const data = await uploadImageApi(blob, jwtToken);
        const imgUrl = data['domain'] + "/" + data['path'];

        // 2. 첨부된 이미지를 화면에 표시  
        callback(imgUrl, 'image');
    }

    const returnHtml = <StudyFormContainer>
                            <h4>스터디 등록</h4> 
                            <FloatingLabel controlId="floatingInput" label="제목" className="mb-3">
                                <Form.Control name="title" value={title} onChange={onTitleInputHandler} type="text" placeholder="제목을 입력하세요." />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingInput" label="분류" className="mb-3">
                                <Form.Control name="category" value={category} onChange={onCategoryInputHandler} type="text" placeholder="분류를 입력하세요." />
                            </FloatingLabel>
                            <Notification value={notiDate}></Notification>
                            <Editor
                                previewStyle="vertical" // 미리보기 스타일 지정
                                height="600px" // 에디터 창 높이
                                initialEditType="markdown" // 초기 입력모드 설정(디폴트 markdown)
                                toolbarItems={[
                                    // 툴바 옵션 설정
                                    ['heading', 'bold', 'italic', 'strike'],
                                    ['hr', 'quote'],
                                    ['ul', 'ol', 'task', 'indent', 'outdent'],
                                    ['table', 'image', 'link'],
                                    ['code', 'codeblock']
                                ]}
                                hooks= {{
                                    addImageBlobHook: onUploadImage }}
                                plugins={[colorSyntax]} 
                                useCommandShortcut={true}
                                ref={editorRef}
                                ></Editor>
                            <Button onClick={onSubmitHandler} size='default'>등록</Button> <Button onClick={onListHandler} size='default'>목록으로</Button>
                        </StudyFormContainer>
    return (<>{returnHtml}</>);
}

const StudyFormContainer = styled.div`
    margin-top: 30px;
    padding-left: 20px;
    padding-right: 20px;
`

export default StudyForm;