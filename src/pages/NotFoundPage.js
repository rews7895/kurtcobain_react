import React from 'react';
// css 관련
import { makeStyles } from '@material-ui/core/styles';
// 라우팅 관련
import {Link} from 'react-router-dom';
import {STORAGE_BASE_URL} from "../lib/oauth2/info";
import {Helmet} from "react-helmet-async";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: "10rem",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

const NotFoundPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.paper}>
            <Helmet>
                <title>Not Found</title>
            </Helmet>
            <img src={`${STORAGE_BASE_URL}/public/images/logo/loading.png`} width="80px" alt=""/>
            <h3>404 page not found</h3>
            <Link to="/board">홈으로</Link>
        </div>
    );
};

export default NotFoundPage;