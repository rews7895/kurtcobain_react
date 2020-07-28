import React from 'react';
import Editor from "../common/Editor";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


const useStyles = makeStyles((theme) => ({
        root: {
            margin: 'auto',
            width: '100%'
        },
        marginTop: {
            marginTop: '2rem'
        },
        button: {
            margin: theme.spacing(1),
        },
        alignRight: {
            textAlign: 'right'
        },
        backButton: {
            backgroundColor: '#475569'
        },
        error: {
            fontSize: '0.8rem',
            color: '#f44336'
        },
        divError: {
            border: '1.6px solid #f44336'
        }
    }
));

const BoardCreateForm = ({user, boardChangeField, title, content, goBack, save, titleError, contentError, titleErrText, contentErrText, errorFieldInitialize}) => {
    const classes = useStyles();
    const onChangeTitle = e => {
        if(titleError) {
            errorFieldInitialize({status: false, key: 'title', text: ''});
        }
        boardChangeField({key: 'title', value: e.target.value});
    };
    return (
        <Container maxWidth="md">
            <form className={classes.root}>
                <div>
                    <TextField
                        fullWidth
                        size="small"
                        id="standard-basic"
                        label="제목"
                        error={titleError}
                        helperText={titleErrText}
                        className={`${classes.marginTop}`}
                        onChange={onChangeTitle}
                        value={title}
                    />
                </div>
                <div className={`${classes.marginTop} ${contentError && classes.divError}`}>
                    <Editor
                        boardChangeField={boardChangeField}
                        content={content}
                        errorFieldInitialize={errorFieldInitialize}
                        contentError={contentError}
                    />
                </div>
                <div>
                    <span className={`${classes.error}`}>{contentErrText}</span>
                </div>
                <div className={`${classes.marginTop} ${classes.alignRight} ${classes.option}`}>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={`${classes.button} ${classes.backButton}`}
                        startIcon={<ArrowBackIosIcon/>}
                        onClick={goBack}
                    >
                        돌아가기
                    </Button>
                    {user && (
                        <Button
                            variant="contained"
                            color="primary"
                            className={`${classes.button}`}
                            endIcon={<SendIcon/>}
                            onClick={save}
                        >
                            저장
                        </Button>
                    )}
                </div>
            </form>
        </Container>
    );
};

export default BoardCreateForm;