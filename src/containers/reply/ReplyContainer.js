import React, {useCallback, useEffect} from 'react';
import ReplyForm from "../../components/reply/ReplyForm";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from 'react-router-dom';
import {
    createTargetIdChange,
    initialize,
    initializeError,
    initializeMessage,
    replyChangeField,
    replyCreate, replyDelete,
    replyList, replyUpdate, updateTargetIdChange
} from "../../modules/reply";
import {useSnackbar} from "notistack";

const ReplyContainer = ({match}) => {
    const {id} = match.params;
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const {board, user, replyContent, message, variant, error, replies, updateTargetId, updateContent, createTargetId, createContent} = useSelector(({user, reply, board}) => ({
        board: board.board,
        user: user.user,
        replyContent: reply.replyContent,
        message: reply.message,
        variant: reply.variant,
        error: reply.error,
        replies: reply.replies,
        createTargetId: reply.createTargetId,
        createContent: reply.createContent,
        updateTargetId: reply.updateTargetId,
        updateContent: reply.updateContent,
    }));
    useEffect(() => {
        dispatch(replyList({boardId: id}));
        //언마운트될 때 리덕스에서 게시판 초기화
        return () => {
            dispatch(initialize());
        };
    }, [dispatch, id]);
    useEffect(() => {
        if(variant === "success") {
            enqueueSnackbar(message, { variant: variant });
            dispatch(replyList({boardId: id}));
            dispatch(initializeMessage());
        }
    }, [dispatch, enqueueSnackbar, id, message, variant]);

    useEffect(() => {
        if(error) {
            let field;
            let defaultMessage;
            // eslint-disable-next-line array-callback-return
            error.map((err) => {
                field = err.field;
                defaultMessage = err.defaultMessage;
            });
            if(field === "content") {
                enqueueSnackbar(defaultMessage, { variant: "error" });
            } else {
                enqueueSnackbar("저장에 실패했습니다.", { variant: "error" });
            }
            dispatch(initializeError());
        }
    }, [dispatch, enqueueSnackbar, error]);

    const changeField = useCallback(payload => dispatch(replyChangeField(payload)), [dispatch]);
    const updateTargetIdSetting = ({updateTargetId}) => {
        dispatch(updateTargetIdChange({updateTargetId}));
    }
    const createTargetIdSetting = ({createTargetId}) => {
        dispatch(createTargetIdChange({createTargetId}));
    }
    const saveClick = ({content, originId, toUserId}) => {
        dispatch(replyCreate({boardId: id, content: content, originId, toUserId}));
    };
    const updateAction = ({id, content}) => {
        dispatch(replyUpdate({boardId: match.params.id, id, content}));
    }
    const deleteAction = ({id}) => {
        dispatch(replyDelete({id}));
    }

    return (
        <>
            <ReplyForm
                board={board}
                user={user}
                replyContent={replyContent}
                saveClick={saveClick}
                replies={replies}
                changeField={changeField}
                updateTargetId={updateTargetId}
                updateContent={updateContent}
                createTargetId={createTargetId}
                createContent={createContent}
                updateTargetIdSetting={updateTargetIdSetting}
                createTargetIdSetting={createTargetIdSetting}
                updateAction={updateAction}
                deleteAction={deleteAction}
            />
        </>
    );
};

export default withRouter(ReplyContainer);