import axios from "axios";
import { API } from "./config"

// 로그인
const loadUser = () => {
    return axios.get(API.AUTHLOAD)
}

const createUser = (values) => {
    return axios.post(API.AUTHINSERT, values)
}

const Login = () => {

}

const updateUser = () => {

}

// 게시판
const getPost = (page) => {
    return axios.get(API.POSTLOAD, {params: {page:page}})
}

const createPost = () => {
    
}

const loadPost = (idx) => {

}

const updatePost = () => {
    
}

const deletePost = (idx) => {
    return axios.post(API.POSTDELETE, {idx})
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
    return axios.post(API.BOARDDELETEADMIN, {idx})
}

// 문의
const contact = (values) => {
    return axios.post(API.CONTACT, values)
}

const service = {
    // 로그인
    loadUser,
    createUser,
    Login, 
    updateUser,

    // 게시판
    getPost,
    loadPost,
    createPost,
    updatePost,
    deletePost,

    // 방명록
    getBoard,
    createBoard,
    deleteBoard,
    deleteBoardAdmin,

    // 문의
    contact
};

export default service;