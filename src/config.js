export const API = {
    // CSRF
    CSRFTOKEN: 'csrf_token',
    LOADIMAGE: 'load_image',

    // 로그인
    AUTHLOAD: 'auth/load',
    AUTHINSERT: 'auth/insert',
    AUTHLOGIN: 'auth/login',
    AUTHCHECK: 'auth/check',
    AHTHUPDATE: 'auth/update',

    // 게시판
    POSTLOAD: 'post/load',
    POSTINSERT: 'post/insert',
    POSTUPLOAD: 'post/upload',
    POSTSELECT: 'post/select',
    POSTUPDATE: 'post/update',
    POSTDELETE: 'post/delete',

    // 방명록
    BOARDLOAD: 'memo/load',
    BOARDINSERT: 'memo/insert',
    BOARDUPDATE: 'memo/update',
    BOARDDELETE: 'memo/delete',
    BOARDDELETEADMIN: 'memo/delete_admin',

    // 문의
    CONTACT: 'contact',
};