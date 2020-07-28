import client from './client';
import {ACCESS_TOKEN} from "../oauth2/info";

//로그인
// export const login = ({username, password}) =>
//     client.post('/api/auth/login', {username, password});

//회원가입
// export const register = ({username, password}) =>
//     client.post('/api/auth/register', {username, password});

//로그아웃
// export const logout = () => client.post('/api/auth/logout');

// 유저 정보 가져오기
export const user = () => client.get('/api/auth/user', {
    // 처음 토큰 장착 이슈로 각 axio별로 헤더 요청 2020-06-23
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    }
});

// 토큰 유효기간이 5일 이하일 때 새로운 토큰 발급
export const token = () => client.post('/api/auth/token', null, {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    }
})