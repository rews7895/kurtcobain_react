import React, {useEffect, useState} from 'react';
import BoardViewForm from "../../components/board/BoardViewForm";
import {withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {boardDelete, boardUpdateSetting, boardView, initializeBoardView} from "../../modules/board";
import Modal from "../../components/common/Modal";
import {setAlert} from "../../modules/alert";
import {Helmet} from "react-helmet-async";

const BoardViewContainer = ({match, history, location}) => {
    const {id} = match.params;
    const dispatch = useDispatch();
    const {board, user, error, del, message, variant} = useSelector(({board, user}) => ({
        board: board.board,
        user: user.user,
        error: board.error,
        del: board.del,
        message: board.message,
        variant: board.variant
    }));
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(boardView(id));
        //언마운트될 때 리덕스에서 게시판 초기화
        return () => {
            dispatch(initializeBoardView());
        };
    }, [dispatch, id]);

    useEffect(() => {
        if(del) {
            dispatch(setAlert({message, variant}));
            history.push('/board');
        }
    }, [del, dispatch, history, message, variant]);

    const goBack = () => {
        if(location.state && location.state.from) {
            if(location.state.from === '/board/create' || location.state.from.indexOf('edit')) {
                history.push('/board')
            } else {
                history.goBack();
            }
        } else {
            history.goBack();
        }
    };
    const goUpdate = () => {
        dispatch(boardUpdateSetting(board));
        history.push(`/board/${id}/edit`);
    };

    const openModal = () => {
        setOpen(true);
    }
    const closeModal = () => {
        setOpen(false);
    }

    const onDelete = () => {
        closeModal();
        dispatch(boardDelete(id));
    }
    return (
        <>
            <Helmet>
                <title>{board ? board.title : '게시글'}</title>
            </Helmet>
            <BoardViewForm
                board={board}
                error={error}
                user={user}
                goBack={goBack}
                goUpdate={goUpdate}
                openModal={openModal}
            />
            <Modal
                closeModal={closeModal}
                onDelete={onDelete}
                open={open}
            >
                정말로 삭제하시겠습니까?
            </Modal>
        </>
    );
};

export default withRouter(BoardViewContainer);