import React from 'react';
import RegisterContainer from "../../containers/auth/RegisterContainer";
import FadeTemplate from "../../components/common/FadeTemplate";

const RegisterPage = () => {
    return (
        <FadeTemplate>
            <RegisterContainer/>
        </FadeTemplate>
    );
};

export default RegisterPage;