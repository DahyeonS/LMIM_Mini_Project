import axios from "axios";
import { API } from "./config"

// 로그인

// 게시판
const getPost = () => {
    return axios.get(API.POSTLOAD)
}

// 방명록
const getBoard = (page) => {
    return axios.get(API.BOARDLOAD, {params: {page:page}})
}

const createBoard = (values) => {
    return axios.post(API.BOARDINSERT, values)
}

const deleteBoard = (idx, password) => {
    return axios.post(API.BOARDDELETE, {idx, password})
}

const deleteBoardAdmin = (idx) => {
    return axios.post(API.BOARDDELETEADMIN)
}

// 문의

const service = {
    // 로그인

    // 게시판
    getPost,

    // 방명록
    getBoard,
    createBoard,
    deleteBoard,
    deleteBoardAdmin

    // 문의
    
};

export default service;