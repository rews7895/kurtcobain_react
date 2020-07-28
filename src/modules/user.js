import {createAction, handleActions} from 'redux-actions';

const TOKEN = 'user/TOKEN';
const USER = 'user/USER';
const LOGOUT = 'user/LOGOUT';

// 토큰과 유저정보 가져오기
export const setToken = createAction(TOKEN);
export const setUser = createAction(USER);

// 로그아웃
export const logout = createAction(LOGOUT);

const initialState = {
    user: null,
    token: null,
    expires: null
}

export default handleActions(
    {
        [USER]: (state, {payload: user}) => ({
            ...state,
            user,
        }),
        [TOKEN]: (state, {payload: token}) => ({
            ...state,
            token: token.token,
            expires: token.expires
        }),
        [LOGOUT]: state => ({
            ...state,
            user: null,
            token: null,
            expires: null
        })
    },
    initialState,
);