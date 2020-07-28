import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {boardChangeField, boardUpdate, initialize, initializeBoardError, boardChangeErrorField} from "../../modules/board";
import {withRouter} from 'react-router-dom';
import {setAlert} from "../../modules/alert";
import BoardUpdateForm from "../../components/board/BoardUpdateForm";
import {useSnackbar} from "notistack";

const BoardUpdateContainer = ({history, location}) => {
    const dispatch = useDispatch();
    const {id, title, content, user, message, variant, updateId, error, titleError, contentError, titleErrText, contentErrText} = useSelector(({board, user}) => ({
        title: board.title,
        content: board.content,
        user: user.user,
        id: board.id,
        updateId: board.updateId,
        message: board.message,
        variant: board.variant,
        error : board.error,
        titleError: board.titleError,
        contentError: board.contentError,
        titleErrText: board.titleErrText,
        contentErrText: board.contentErrText
    }));
    const { enqueueSnackbar } = useSnackbar();

    const changeField = useCallback(payload => dispatch(boardChangeField(payload)), [dispatch]);

    const errorFieldInitialize = (payload) => dispatch(boardChangeErrorField(payload));

    useEffect(() => {
        //언마운트될 때 리덕스에서 게시판 초기화
        return () => {
            dispatch(initialize());
        };
    }, [dispatch]);

    useEffect(() => {
        if(id) {
            dispatch(setAlert({message, variant}));
            history.push({
                pathname: `/board/${id}`,
                state: {
                    from: location.pathname
                }
            });
        }
    }, [id, history, location.pathname, dispatch, message, variant]);

    useEffect(() => {
        if(!user) {
            history.push('/board');
        }
        if(!updateId) {
            history.push('/board');
        }
    }, [history, updateId, user]);

    useEffect(() => {
        if(error) {
            enqueueSnackbar("수정에 실패했습니다.", { variant: "error" });
            // eslint-disable-next-line array-callback-return
            error.map((err) => {
                dispatch(boardChangeErrorField({status: true, key: err.field, text: err.defaultMessage}));
            });
            dispatch(initializeBoardError());
        }
    }, [dispatch, enqueueSnackbar, error]);

    const goBack = () => {
        history.goBack();
    };
    const save = () => {
        dispatch(boardUpdate({updateId, title, content}));
    }
    return (
        <>
            <BoardUpdateForm
                updateId={updateId}
                boardChangeField={changeField}
                title={title}
                content={content}
                user={user}
                goBack={goBack}
                save={save}
                titleError={titleError}
                contentError={contentError}
                titleErrText={titleErrText}
                contentErrText={contentErrText}
                errorFieldInitialize={errorFieldInitialize}
            />
        </>
    );
};

export default withRouter(BoardUpdateContainer);