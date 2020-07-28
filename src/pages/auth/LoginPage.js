import React from 'react';
import LoginContainer from "../../containers/auth/LoginContainer";
import FadeTemplate from "../../components/common/FadeTemplate";

const LoginPage = () => {
    return (
        <FadeTemplate>
            <LoginContainer/>
        </FadeTemplate>
    );
};

export default LoginPage;