import React, {useEffect} from 'react';
import Fade from '@material-ui/core/Fade';
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import {deleteAlert} from "../../modules/alert";
import {ACCESS_TOKEN, EXPIRES, USER_INFO} from "../../lib/oauth2/info";
import {logout, setToken, setUser} from "../../modules/user";
import {withRouter} from 'react-router-dom';
import {token, user as getUser} from "../../lib/api/user";
import {finishLoading, startLoading} from "../../modules/loading";

const FadeTemplate = ({children, history}) => {
    const [checked, setChecked] = React.useState(false);

    const {message, variant, expires, user} = useSelector(({alert, user}) => ({
        message: alert.message,
        variant: alert.variant,
        expires: user.expires,
        user: user.user
    }));
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();

    // 토큰이 만료까지 5일 남았는지 여부 확인(5일 남았으면 새로 요청받아서 새로 저장하고 페이지를 보여준다)
    // 만료된 토큰을 가지고 있으면 유저정보랑 토큰 등 다 삭제
    useEffect(() => {
        const current_date = new Date();
        const expire_date = new Date(Number(expires));

        let gap = current_date - expire_date;
        gap = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;

        //유저가 null이 아닌지 체크
        if(user) {
            //페이지 렌더링 도중 토큰 만료시
            if(current_date > expire_date) {
                dispatch(logout());
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(EXPIRES);
                localStorage.removeItem(USER_INFO);
                history.push('/');
            } else {
                if(gap <= 5) {
                    dispatch(startLoading());
                    token().then(response => {
                        const accessToken = response.data.accessToken;
                        const expires = response.data.expires;
                        localStorage.setItem(ACCESS_TOKEN, accessToken);
                        localStorage.setItem(EXPIRES, expires);
                        dispatch(setToken({token: accessToken, expires: expires}));

                    });
                    getUser().then(response => {
                        localStorage.setItem(USER_INFO, JSON.stringify(response.data));
                        dispatch(setUser(response.data));
                    });
                    dispatch(finishLoading());
                }
            }
        }
        const timer = setTimeout(() => {
            setChecked(true);
        }, 150);
        //뒷정리
        return () => {
            setChecked(false);
            clearTimeout(timer);
        };
    }, [dispatch, expires, history, user]);
    // 이전 페이지에서 받은 alert 메시지가 있으면 alert을 생성하고 초기화
    useEffect(() => {
        const timer = setTimeout(() => {
            if(message !== null && variant !== null) {
                enqueueSnackbar(message, { variant: variant });
                dispatch(deleteAlert());
            }
        }, 300);
        //뒷정리
        return () => {
            clearTimeout(timer);
        };
    }, [dispatch, message, variant, enqueueSnackbar]);

    return (
        <Fade in={checked}>
            <div>
                {children}
            </div>
        </Fade>
    );
}

export default withRouter(FadeTemplate);