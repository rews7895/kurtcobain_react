import React from 'react';
import LoginForm from "../../components/auth/LoginForm";
import {withRouter} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {startLoading} from "../../modules/loading";

const LoginContainer = ({history}) => {
    const dispatch = useDispatch();

    const onClick = (url)  => {
        dispatch(startLoading());
        document.location.href = url;
    };

    return (
        <>
            <LoginForm onClick={onClick}/>
        </>
    );
};

export default withRouter(LoginContainer);