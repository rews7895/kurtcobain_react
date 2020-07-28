import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';

import createSagaMiddleware from 'redux-saga';
import { HelmetProvider } from 'react-helmet-async';
import rootReducer, {rootSaga} from "./modules";
import {ACCESS_TOKEN, EXPIRES, USER_INFO} from "./lib/oauth2/info";
import {logout, setToken, setUser} from "./modules/user";
import {user} from "./lib/api/user";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
    // composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser() {
    try {
        // 로컬스토리지 토큰 가져오기
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        const expires = localStorage.getItem(EXPIRES);
        if(accessToken && expires) {
            // 토큰 만료 비교시 사용하는 변수들
            const current_date = new Date();
            const expire_date = new Date(Number(expires));

            if(current_date > expire_date) {
                store.dispatch(logout());
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(EXPIRES);
                localStorage.removeItem(USER_INFO);
            } else {
                // 토큰 상태저장(새로고침시)
                store.dispatch(setToken({token: accessToken, expires: expires}));
                // 로컬스토리지 유저정보 가져오기
                const localUser = localStorage.getItem(USER_INFO);
                if(localUser) {
                    // 유저 상태저장(새로고침시)
                    store.dispatch(setUser(JSON.parse(localUser)));
                } else {
                    // 없으면 토큰을 이용하여 새로 요청
                    user().then(response => {
                        localStorage.setItem(USER_INFO, JSON.stringify(response.data));
                        store.dispatch(setUser(response.data));
                    });
                }
            }
        } else {
            //로그인 상태가 아니라면 아무것도 안함
            return;
        }
    } catch (e) {
        console.log('localStorage is not working');
    }
}
sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
