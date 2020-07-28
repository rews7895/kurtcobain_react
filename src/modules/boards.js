import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes
} from "../lib/createRequestSaga";
import * as boardAPI from '../lib/api/board';
import {takeLatest} from 'redux-saga/effects';

// 검색필드 입력
const BOARD_SEARCH_CHANGE_FIELD = 'board/BOARD_SEARCH_CHANGE_FIELD';

const [
    LIST_BOARDS,
    LIST_BOARDS_SUCCESS,
    LIST_BOARDS_FAILURE
] = createRequestActionTypes('posts/LIST_BOARDS');

export const boardSearchChangeField = createAction(BOARD_SEARCH_CHANGE_FIELD, ({key, value}) => ({
    key,
    value
}));

export const listBoards = createAction(
    LIST_BOARDS,
    ({keyword, page}) => ({keyword, page}),
);

const listBoardsSaga = createRequestSaga(LIST_BOARDS, boardAPI.listBoards);
export function* boardsSaga() {
    yield takeLatest(LIST_BOARDS, listBoardsSaga);
}

const initialState = {
    boards      : null,
    info        : null,
    error       : null,
    keyword     : '',
    totalPage   : 1,
    currentPage : 1
};

const posts = handleActions(
    {
        [BOARD_SEARCH_CHANGE_FIELD]: (state, {payload: {key, value}}) => ({
            ...state,
            [key]: value,
        }),
        [LIST_BOARDS_SUCCESS]: (state, {payload: data}) => ({
            ...state,
            boards      : data.boards,
            info        : data.info,
            keyword     : data.info.keyword,
            totalPage   : data.info.totalPage,
            currentPage : data.info.currentPage
        }),
        [LIST_BOARDS_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error
        })
    },
    initialState,
);

export default posts;