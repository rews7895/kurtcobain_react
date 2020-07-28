import React from 'react';
import {ACCESS_TOKEN, USER_INFO, EXPIRES} from './info';
import { Redirect } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {setToken, setUser} from "../../modules/user";
import {user} from "../api/user";
import {finishLoading, startLoading} from "../../modules/loading";
import {setAlert} from "../../modules/alert";

const OAuth2RedirectHandler = ({location}) => {
    const dispatch = useDispatch();
    dispatch(startLoading());
    const accessToken = getUrlParameter('accessToken', location.search);
    const error = getUrlParameter('error', location.search);
    const expires = getUrlParameter('expires', location.search);

    let message = '';
    if(error) {
        message = getErrorMessage(error);
    }
    if(accessToken) {
        try {
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(EXPIRES, expires);
            dispatch(setToken({token: accessToken, expires: expires}));
            user().then(response => {
                localStorage.setItem(USER_INFO, JSON.stringify(response.data));
                dispatch(setUser(response.data));
            });
            dispatch(finishLoading());
            dispatch(setAlert({message: "로그인 되었습니다.", variant: "success"}));
            return <Redirect to={{
                pathname: "/board",
            }}/>;
        } catch (e) {
            dispatch(setAlert({message: message, variant: "error"}));
            dispatch(finishLoading());
            console.log(error);
            return <Redirect to={{
                pathname: "/login",
            }}/>;
        }
    } else {
        dispatch(setAlert({message: message, variant: "error"}));
        dispatch(finishLoading());
        console.log(error);
        return <Redirect to={{
            pathname: "/login",
        }}/>;
    }
};

const getUrlParameter = (name, location) => {
    const value = new URLSearchParams(location).get(name);
    return value === null ? '' : value
};
const getErrorMessage = (error) => {
    let message;
    if(error.indexOf("code001") !== -1) {
        message = "가입을 위해서 facebook 계정 설정의 이메일 설정을 확인해주세요.";
    } else if(error.indexOf("code002") !== -1) {
        message = "가입을 위해서 github 계정의 public email설정을 확인해주세요.";
    } else if(error.indexOf("code003") !== -1) {
        message = "가입을 위해서 동의화면 상의 이메일 사용 동의을 허락해주셔야 합니다.";
    } else if(error.indexOf("code004") !== -1) {
        message = "OAuth2 공급자 정보 중 이메일을 찾을 수 없습니다.";
    } else if(error.indexOf("code005") !== -1) {
        if(error.indexOf("facebook") !== -1) {
            message = "facebook에서 해당 이메일을 사용중입니다. facebook으로 로그인해주세요.";
        } else if(error.indexOf("github") !== -1) {
            message = "github에서 해당 이메일을 사용중입니다. github으로 로그인해주세요.";
        } else if(error.indexOf("kakao") !== -1) {
            message = "github에서 해당 이메일을 사용중입니다. github으로 로그인해주세요.";
        } else {
            message = "해당 이메일을 사용중입니다.";
        }
    } else {
        message = error;
    }
    return message;
};

export default OAuth2RedirectHandler;