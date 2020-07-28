import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            width: '70%',
            minWidth: '350px'
        },
        marginTop: theme.spacing(1)
    },
    inputBox: {
        textAlign: 'right',
    },
    button: {
        marginLeft: theme.spacing(1),
        fontSize: '0.5rem',
        padding: '1px'
    },
    controlLine: {
        marginTop: theme.spacing(0.3),
        marginBottom: theme.spacing(2)
    },
}));

const NewInputBoxForm = ({changeField, saveClick, createContent, reply, createCancelClick}) => {
    const classes = useStyles();
    const inputFieldChangeField = e => {
        changeField({key: 'createContent', value: e.target.value});
    }
    const onClick = () => {
        saveClick({content: createContent, originId: reply.originId, toUserId: reply.toUserId});
    }
    return (
        <div className={classes.root}>
            <div className={classes.inputBox}>
                <div>
                    <TextField
                        id="outlined-textarea"
                        label="답글을 작성해주세요"
                        multiline
                        variant="outlined"
                        onChange={inputFieldChangeField}
                        value={createContent}
                        autoFocus={true}
                    />
                </div>
                <div className={classes.controlLine}>
                    <Button
                        variant="outlined"
                        color="default"
                        size="small"
                        onClick={createCancelClick}
                        className={classes.button}
                    >
                        취소
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={onClick}
                        className={classes.button}
                    >
                        저장
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NewInputBoxForm;