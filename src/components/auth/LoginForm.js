import React from 'react';
// css 관련
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// 라우팅 관련
import {Link} from 'react-router-dom';
// oauth2 관련
import {
    FACEBOOK_AUTH_URL,
    GITHUB_AUTH_URL,
    GOOGLE_AUTH_URL,
    NAVER_AUTH_URL,
    KAKAO_AUTH_URL,
    STORAGE_BASE_URL
} from "../../lib/oauth2/info";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" to="/">
                KurtCobain.co.kr
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    loginButton: {
        marginBottom: theme.spacing(1),
        height: "3rem",
    },
    buttonSpan: {
        width: "8rem",
        marginLeft: "1rem",
        textAlign: "left"
    },
    facebook: {
        backgroundColor: "#4267b2",
        '&:hover': { backgroundColor: "#475569", color: "" }
    },
    google: {
        backgroundColor: "white",
        color: "black",
        '&:hover': { backgroundColor: "#475569", color: "white" }
    },
    kakao: {
        backgroundColor: "#FAE100",
        color: "black",
        '&:hover': { backgroundColor: "#475569", color: "white" }
    },
    naver: {
        backgroundColor: "#03cf5d",
        '&:hover': { backgroundColor: "#475569", color: "" }
    },
    github: {
        backgroundColor: "black",
        '&:hover': { backgroundColor: "#475569", color: "" }
    }
}));

const LoginForm = ({onClick}) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Link to="/">
                    <img src={`${STORAGE_BASE_URL}/public/images/logo/login-logo.png`} width="300px" alt="logo"/>
                </Link>
                <form className={classes.form} noValidate>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={`${classes.loginButton} ${classes.facebook}`}
                        onClick={() => onClick(FACEBOOK_AUTH_URL)}
                    >
                        <img src={`${STORAGE_BASE_URL}/public/images/oauth2-logo/facebook.png`} width="30px" height="30px" alt="facebook login"/>
                        <span className={classes.buttonSpan}>FaceBook 로그인</span>
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        className={`${classes.loginButton} ${classes.kakao}`}
                        onClick={() => onClick(KAKAO_AUTH_URL)}
                    >
                        <img src={`${STORAGE_BASE_URL}/public/images/oauth2-logo/kakao.png`} width="30px" height="30px" alt="kakao login"/>
                        <span className={classes.buttonSpan}>kakao 로그인</span>
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={`${classes.loginButton} ${classes.naver}`}
                        onClick={() => onClick(NAVER_AUTH_URL)}
                    >
                        <img src={`${STORAGE_BASE_URL}/public/images/oauth2-logo/naver.gif`} width="30px" height="30px" alt="naver login"/>
                        <span className={classes.buttonSpan}>naver 로그인</span>
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        className={`${classes.loginButton} ${classes.google}`}
                        onClick={() => onClick(GOOGLE_AUTH_URL)}
                    >
                        <img src={`${STORAGE_BASE_URL}/public/images/oauth2-logo/google.png`} width="30px" height="30px" alt="google login"/>
                        <span className={classes.buttonSpan}>google 로그인</span>
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={`${classes.loginButton} ${classes.github}`}
                        onClick={() => onClick(GITHUB_AUTH_URL)}
                    >
                        <img src={`${STORAGE_BASE_URL}/public/images/oauth2-logo/github.png`} width="30px" height="30px" alt="github login"/>
                        <span className={classes.buttonSpan}>github 로그인</span>
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default LoginForm;