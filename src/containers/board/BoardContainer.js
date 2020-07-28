import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import BoardForm from "../../components/board/BoardForm";
import {withRouter} from 'react-router-dom';
import qs from 'qs';
import {listBoards} from "../../modules/boards";
import {boardSearchChangeField} from "../../modules/boards";

const BoardContainer = ({history, location}) => {
    const dispatch = useDispatch();
    const {boards, currentPage, totalPage, error, user, keyword} = useSelector(({user, boards}) => ({
        boards          : boards.boards,
        currentPage     : boards.currentPage,
        totalPage       : boards.totalPage,
        error           : boards.error,
        user            : user.user,
        keyword         : boards.keyword
    }));
    const onSearchChange = useCallback(payload => dispatch(boardSearchChangeField(payload)), [dispatch]);
    const onCreateClick = () => {
        history.push('/board/create')
    }
    const onSearchClick = () => {
        let query = '';
        if(keyword !== '') {
            query = qs.stringify({keyword});
        }
        if(query !== '') {
            query = '?' + query;
        }
        history.push(`/board${query}`);
    }
    const onSearchKeyPress = e => {
        if(e.key === 'Enter') {
            e.preventDefault();
            let query = '';
            if(keyword !== '') {
                query = qs.stringify({keyword});
            }
            if(query !== '') {
                query = '?' + query;
            }
            history.push(`/board${query}`);
        }
    }
    const onPagingChange = (event, page) => {
        let query;
        const { keyword } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        query = qs.stringify({page, keyword});
        if(query !== '') {
            query = '?' + query;
        }
        history.push(`/board${query}`);
    }
    useEffect(() => {
        // const { username } = match.params;
        const { keyword, page } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        dispatch(listBoards({ keyword, page }));
    }, [dispatch, location.search]);
    useEffect(() => {
       if(location.pathname === '/') {
           history.push('/board');
       }
    },[history, location.pathname]);
    return (
        <>
            <BoardForm
                user={user}
                onCreateClick={onCreateClick}
                onPagingChange={onPagingChange}
                boards={boards}
                currentPage={currentPage}
                totalPage={totalPage}
                error={error}
                keyword={keyword}
                onSearchChange={onSearchChange}
                onSearchClick={onSearchClick}
                onSearchKeyPress={onSearchKeyPress}
            />
        </>
    );
};

export default withRouter(BoardContainer);