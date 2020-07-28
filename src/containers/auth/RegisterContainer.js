import React from 'react';
import RegisterForm from "../../components/auth/RegisterForm";
import {withRouter} from 'react-router-dom';
import {startLoading} from "../../modules/loading";
import {useDispatch} from "react-redux";

const RegisterContainer = ({history}) => {
    const dispatch = useDispatch();

    const onClick = (url)  => {
        dispatch(startLoading());
        document.location.href = url;
    };
    return (
        <div>
            <RegisterForm
                onClick={onClick}
            />
        </div>
    );
};

export default withRouter(RegisterContainer);