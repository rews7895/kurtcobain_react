import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Header from "../../components/common/Header";
import {logout} from "../../modules/user";
import {ACCESS_TOKEN, EXPIRES, USER_INFO} from "../../lib/oauth2/info";
import {setAlert} from "../../modules/alert";
import {withRouter} from 'react-router-dom';

const HeaderContainer = ({history}) => {
    const {user} = useSelector(({user}) => ({user: user.user}));
    const dispatch = useDispatch();
    const onLogout = () => { 
        dispatch(logout());
        localStorage.removeItem(USER_INFO);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(EXPIRES);

        dispatch(setAlert({message: "로그아웃 되었습니다.", variant: "success"}));

        history.push('/');
    }
    const goRegister = () => {
        history.push('/register');
    }
    const goLogin = () => {
        history.push('/login');
    }
    return (
        <>
            <Header
                user={user}
                onLogout={onLogout}
                goRegister={goRegister}
                goLogin={goLogin}
            />
        </>
    );
};

export default withRouter(HeaderContainer);