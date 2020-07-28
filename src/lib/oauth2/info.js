// spring local 8080 port
export const API_BASE_URL = 'http://localhost:8080';
// spring local 8080 port
export const STORAGE_BASE_URL = 'http://localhost:8080';
// yarn build
// export const STORAGE_BASE_URL = 'http://localhost:5000';
export const ACCESS_TOKEN = 'accessToken';
export const EXPIRES = 'expires'
export const USER_INFO = 'userInfo';
// yarn start
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
// yarn build
// export const OAUTH2_REDIRECT_URI = 'http://localhost:5000/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const NAVER_AUTH_URL = API_BASE_URL + '/oauth2/authorize/naver?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const KAKAO_AUTH_URL = API_BASE_URL + '/oauth2/authorize/kakao?redirect_uri=' + OAUTH2_REDIRECT_URI;
