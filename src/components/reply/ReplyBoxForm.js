import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import NewInputBoxForm from "./NewInputBoxForm";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            width: '70%',
            minWidth: '350px'
        },
    },
    replyBox: {
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(1.5),
        textAlign: 'right',
    },
    controlLine: {
        marginTop: theme.spacing(0.3)
    },
    button: {
        marginLeft: theme.spacing(1),
        fontSize: '0.5rem',
        padding: '1px'
    },
    changeField: {
        marginTop: theme.spacing(1.5)
    }
}));

const ReplyBoxForm = ({reply, user, changeField, saveClick,
                          createTargetId, createContent, updateTargetId, updateContent,
                          createTargetIdSetting, updateTargetIdSetting, updateAction, deleteAction}) => {
    const classes = useStyles();
    const label = reply.id === reply.originId ? `from.${reply.userName} (${reply.createdDate})` : `to.${reply.toUserName} - from.${reply.userName} (${reply.createdDate})`;

    const updateChangeField = e => {
        changeField({key: 'updateContent', value: e.target.value});
    }
    const updateViewClick = () => {
        updateTargetIdSetting({updateTargetId: reply.id});
        changeField({key: 'updateContent', value: reply.content});
    }
    const updateCancelClick = () => {
        updateTargetIdSetting({updateTargetId: null});
    }
    const updateClick = () => {
        updateAction({id: reply.id, content: updateContent});
    }
    const deleteClick = () => {
        deleteAction({id: reply.id});
    }
    const createViewClick = () => {
        createTargetIdSetting({createTargetId: reply.id});
    }
    const createCancelClick = () => {
        createTargetIdSetting({createTargetId: null});
    }
    return (
        <div className={classes.root}>
            <div className={classes.replyBox}>
                <div>
                    {updateTargetId !== reply.id && (
                        <TextField
                            id="outlined-textarea"
                            label={label}
                            multiline
                            variant="outlined"
                            value={reply.content}
                            disabled={true}
                        />
                    )}
                    {updateTargetId === reply.id && (
                        <TextField
                            id="outlined-textarea"
                            label={label}
                            multiline
                            variant="outlined"
                            value={updateContent}
                            onChange={updateChangeField}
                            autoFocus={true}
                        />
                    )}
                </div>
                <div className={classes.controlLine}>
                    {user && (
                        <>
                            <Button variant="outlined" color="primary" size="small" className={classes.button} onClick={createViewClick}>
                                답글
                            </Button>
                            {user.id === reply.userId && (
                                <>
                                    {updateTargetId === reply.id && (
                                        <>
                                            <Button variant="outlined" color="default" size="small" className={classes.button} onClick={updateCancelClick}>
                                                취소
                                            </Button>
                                            <Button variant="outlined" color="primary" size="small" className={classes.button} onClick={updateClick}>
                                                수정
                                            </Button>
                                        </>
                                    )}
                                    {updateTargetId !== reply.id && (
                                        <>
                                            <Button variant="outlined" color="secondary" size="small" className={classes.button} onClick={deleteClick}>
                                                삭제
                                            </Button>
                                            <Button variant="outlined" color="primary" size="small" className={classes.button} onClick={updateViewClick}>
                                                수정
                                            </Button>
                                        </>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
                {reply.id === createTargetId && (
                    <div>
                        <NewInputBoxForm
                            reply={reply}
                            changeField={changeField}
                            createContent={createContent}
                            saveClick={saveClick}
                            createCancelClick={createCancelClick}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReplyBoxForm;