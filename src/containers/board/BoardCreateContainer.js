import React, {useCallback, useEffect} from 'react';
import BoardCreateForm from "../../components/board/BoardCreateForm";
import {useDispatch, useSelector} from "react-redux";
import {
    boardChangeErrorField,
    boardChangeField,
    boardCreate,
    initialize,
    initializeBoardError
} from "../../modules/board";
import {withRouter} from 'react-router-dom';
import {setAlert} from "../../modules/alert";
import {useSnackbar} from "notistack";

const BoardCreateContainer = ({history, location}) => {
    const dispatch = useDispatch();
    const {id, title, content, user, message, variant, error, titleError, contentError, titleErrText, contentErrText} = useSelector(({board, user}) => ({
        title: board.title,
        content: board.content,
        user: user.user,
        id: board.id,
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
        // 뒷정리 초기화
        return () => {
            dispatch(initialize());
        } ;
    }, [dispatch]);

    useEffect(() => {
        if(id) {
            dispatch(setAlert({message, variant}));
            // history.push(`/board/${id}`);
            history.push({
                pathname: `/board/${id}`,
                state: {
                    from: location.pathname
                }
            });
        }
    }, [id, history, location.pathname, dispatch, message, variant]);

    useEffect(() => {
        if(error) {
            enqueueSnackbar("생성에 실패했습니다.", { variant: "error" });
            // eslint-disable-next-line array-callback-return
            error.map((err) => {
                dispatch(boardChangeErrorField({status: true, key: err.field, text: err.defaultMessage}));
            });
            dispatch(initializeBoardError());
        }
    }, [dispatch, enqueueSnackbar, error]);
    
    useEffect(() => {
        if(!user) {
            history.push('/board');
        }
    }, [history, user]);
    
    const goBack = () => {
        history.goBack();
    };
    const save = () => {
        dispatch(boardCreate({title, content}));
    }
    return (
        <>
            <BoardCreateForm
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

export default withRouter(BoardCreateContainer);