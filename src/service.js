import axios from 'axios';
import { API } from './config'

// CSRF
const getCsrfToken = () => {
    return axios.get(API.CSRFTOKEN)
}

// 로그인
const loadUser = () => {
    return axios.get(API.AUTHLOAD)
}

const createUser = (values, csrfToken) => {
    return axios.post(API.AUTHINSERT, values, {headers:{'X-CSRFToken':csrfToken}})
}

const login = (values, csrfToken) => {
    return axios.post(API.AUTHLOGIN, values, {headers:{'X-CSRFToken':csrfToken}})
}

const checkUser = (values, csrfToken) => {
    return axios.post(API.AUTHCHECK, values, {headers:{'X-CSRFToken':csrfToken}})
}

const loadUpdateUser = () => {
    return axios.get(API.AHTHUPDATE)
}

const updateUser = (values, csrfToken) => {
    return axios.post(API.AHTHUPDATE, values, {headers:{'X-CSRFToken':csrfToken}})
}

// 게시판
const getPost = (page) => {
    return axios.get(API.POSTLOAD, {params: {page}})
}

const createPost = (values, csrfToken) => {
    return axios.post(API.POSTINSERT, values, {headers:{'X-CSRFToken':csrfToken}})
}

const uploadImage = (formData, csrfToken) => {
    return axios.post(API.POSTUPLOAD, formData,
        {headers:{'X-CSRFToken':csrfToken, 'content-type':'multipart/formdata'}, withCredentials: true});
}

const loadImage = (type, name) => {
    return axios.get(API.POSTLOADIMAGE, {params: {type, name}})
}

const loadPost = (idx) => {
    return axios.get(API.POSTSELECT, {idx})
}

const updatePost = (values, csrfToken) => {
    return axios.post(API.POSTUPDATE, values, {headers:{'X-CSRFToken':csrfToken}})
}

const deletePost = (idx, csrfToken) => {
    return axios.post(API.POSTDELETE, {idx}, {headers:{'X-CSRFToken':csrfToken}})
}

// 방명록
const getBoard = (page) => {
    return axios.get(API.BOARDLOAD, {params: {page:page}})
}

const createBoard = (values, csrfToken) => {
    return axios.post(API.BOARDINSERT, values, {headers:{'X-CSRFToken':csrfToken}})
}

const deleteBoard = (idx, password, csrfToken) => {
    return axios.post(API.BOARDDELETE, {idx, password}, {headers:{'X-CSRFToken':csrfToken}})
}

const deleteBoardAdmin = (idx, csrfToken) => {
    return axios.post(API.BOARDDELETEADMIN, {idx}, {headers:{'X-CSRFToken':csrfToken}})
}

// 문의
const contact = (values, csrfToken) => {
    return axios.post(API.CONTACT, values, {headers:{'X-CSRFToken':csrfToken}})
}

const service = {
    // CSRF
    getCsrfToken,

    // 로그인
    loadUser,
    createUser,
    login,
    checkUser,
    loadUpdateUser,
    updateUser,

    // 게시판
    getPost,
    loadPost,
    createPost,
    uploadImage,
    loadImage,
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