import axios from 'axios';
import {API_BASE_URL} from "../oauth2/info";

const client = axios.create();

client.defaults.baseURL = API_BASE_URL;

client.defaults.headers.post['Content-Type'] = 'application/json';

// 처음 토큰 장착 이슈로 각 axio별로 헤더 요청 2020-06-23
// client.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);

export default client;