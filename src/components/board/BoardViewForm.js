import React from 'react';
import Container from '@material-ui/core/Container';
import {makeStyles} from "@material-ui/core/styles";
import Moment from "react-moment";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Link} from "react-router-dom";
import {STORAGE_BASE_URL} from "../../lib/oauth2/info";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";

const BoardViewForm = ({board, error, user, goBack, goUpdate, openModal}) => {
    const classes = useStyles();
    if(!board) {
        return (
        <Container  maxWidth="md">
            {error ? (
                <div className={`${classes.default}`}>
                    <img src={`${STORAGE_BASE_URL}/public/images/logo/loading.png`}  width="80px" alt=""/>
                    <br/>
                    <div className={classes.bold}>{error.message}</div>
                    <br/>
                    <Link to="/board">홈으로</Link>
                </div>
            ) : (
                <div className={`${classes.default}`}>
                    <CircularProgress color="inherit" />
                </div>
            )}
        </Container>
        )
    }
    const {id, title, userName, hit, createdDate, content} = board;
    return (
        <Container  maxWidth="md">
            <div className={classes.breadcrumbs}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link to="/board">자유게시판</Link>
                    <Typography color="textPrimary">{`${id}번 게시글`}</Typography>
                </Breadcrumbs>
            </div>
            <div>
                <div className={`${classes.marginTop} ${classes.lineBottom} ${classes.title}`}>
                    {title}
                </div>
                <div className={`${classes.alignRight}`}>
                    <span className={`${classes.span}`}>작성자 : {userName}</span>
                    <span className={`${classes.span}`}>조회수 : {hit}</span>
                    <span className={`${classes.span}`}>작성일 : <Moment format="YYYY-MM-DD HH:mm:ss">{createdDate}</Moment></span>
                </div>
                <div className={`${classes.marginTop} ${classes.content}`} dangerouslySetInnerHTML={{__html: content}}/>
            </div>
            <div className={`${classes.marginTop} ${classes.buttonLine}`}>
                <Button
                    variant="contained"
                    color="secondary"
                    className={`${classes.button} ${classes.backButton}`}
                    startIcon={<ArrowBackIosIcon/>}
                    onClick={goBack}
                    size={"small"}
                >
                    돌아가기
                </Button>
                {board && user && board.userId === user.id && (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            className={`${classes.button}`}
                            endIcon={<SendIcon/>}
                            onClick={goUpdate}
                            size={"small"}
                        >
                            수정
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={`${classes.button}`}
                            endIcon={<DeleteIcon/>}
                            onClick={openModal}
                            size={"small"}
                        >
                            삭제
                        </Button>
                    </>
                )}
            </div>
            <div className={`${classes.lineTop}`}/>
        </Container>
    );
};

const useStyles = makeStyles((theme) => ({
        root: {
            margin: 'auto',
            width: '100%'
        },
        breadcrumbs: {
            marginTop: '1.3rem'
        },
        marginTop: {
            marginTop: '3rem'
        },
        lineBottom: {
            borderBottom: '0.1rem solid #475569'
        },
        lineTop: {
            borderTop: '0.1rem solid #475569'
        },
        title: {
            fontSize: '1.2rem',
        },
        alignRight: {
            textAlign: 'right'
        },
        span: {
            fontSize: '0.8rem',
            marginLeft: '1rem'
        },
        content: {
            '& p': {
                margin: '0'
            },
            '& ol': {
                margin: '0'
            },
            '& ul': {
                margin: '0'
            },
            '& img': {
              maxWidth: '100%'
            },
            '& .ql-align-center': {
                textAlign: 'center;'
            },
            '& .ql-align-right': {
                textAlign: 'right;'
            },
            '& .ql-align-justify': {
                textAlign: 'justify;'
            }
        },
        button: {
            margin: theme.spacing(1),
        },
        backButton: {
            backgroundColor: '#475569'
        },
        buttonLine: {
            textAlign: "right"
        },
        default: {
            marginTop: '10rem',
            textAlign: "center"
        },
        bold: {
            fontWeight: "bold",
            marginTop: '1rem',
            marginBottom: '0.3rem'
        }
    }
));

export default BoardViewForm;