import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes
} from "../lib/createRequestSaga";
import validateRequestSaga, {
    validateRequestActionTypes
} from "../lib/validateRequestSaga";
import * as boardAPI from '../lib/api/board';
import {takeLatest} from 'redux-saga/effects';

// 초기화
const INITIALIZE = 'board/INITIALIZE';

// 초기화 형태 중 board만 제거
const INITIALIZE_BOARD_VIEW = 'board/INITIALIZE_BOARD_VIEW';

// 리턴받은 에러를 처리하고 초기화
const INITIALIZE_BOARD_ERROR = 'board/INITIALIZE_BOARD_ERROR';

// focus or keyup event handler
const BOARD_CHANGE_ERROR_FIELD = 'board/INITIALIZE_BOARD_ERROR_FIELD';

// 필드 입력
const BOARD_CHANGE_FIELD = 'board/BOARD_CHANGE_FIELD';
// 게시글 생성
const [
    BOARD_CREATE,
    BOARD_CREATE_SUCCESS,
    BOARD_CREATE_FAILURE
] = validateRequestActionTypes('board/BOARD_CREATE');

// 게시글 상세
const [
    BOARD_VIEW,
    BOARD_VIEW_SUCCESS,
    BOARD_VIEW_FAILURE
] = createRequestActionTypes('board/BOARD_VIEW');

// 업데이트 시 기존 게시글 상세의 데이터를 수정페이지에 세팅
const BOARD_UPDATE_SETTING = 'board/BOARD_UPDATE_SETTING';

// 게시글 수정
const [
    BOARD_UPDATE,
    BOARD_UPDATE_SUCCESS,
    BOARD_UPDATE_FAILURE
] = validateRequestActionTypes('board/BOARD_UPDATE');

// 게시글 수정
const [
    BOARD_DELETE,
    BOARD_DELETE_SUCCESS,
    BOARD_DELETE_FAILURE
] = createRequestActionTypes('board/BOARD_DELETE');

export const initialize = createAction(INITIALIZE);

export const initializeBoardView = createAction(INITIALIZE_BOARD_VIEW);

export const initializeBoardError = createAction(INITIALIZE_BOARD_ERROR);

export const boardChangeErrorField = createAction(BOARD_CHANGE_ERROR_FIELD, ({status, key, text}) => ({
    status,
    key,
    text
}));


export const boardChangeField = createAction(BOARD_CHANGE_FIELD, ({key, value}) => ({
    key,
    value
}));

export const boardCreate = createAction(BOARD_CREATE, ({title, content}) => ({
    title, content
}));

export const boardView = createAction(BOARD_VIEW, id => id);

export const boardUpdateSetting = createAction(BOARD_UPDATE_SETTING, board => board);

export const boardUpdate = createAction(
    BOARD_UPDATE,
    ({updateId, title, content}) => ({
        updateId,
        title,
        content
    }),
);

export const boardDelete = createAction(BOARD_DELETE, id => id);

const boardCreateSaga = validateRequestSaga(BOARD_CREATE, boardAPI.boardCreate);
const boardViewSaga = createRequestSaga(BOARD_VIEW, boardAPI.boardView);
const boardUpdateSaga = validateRequestSaga(BOARD_UPDATE, boardAPI.boardUpdate);
const boardDeleteSaga = createRequestSaga(BOARD_DELETE, boardAPI.boardDelete);

export function* boardSaga() {
    yield takeLatest(BOARD_CREATE, boardCreateSaga);
    yield takeLatest(BOARD_VIEW, boardViewSaga);
    yield takeLatest(BOARD_UPDATE, boardUpdateSaga);
    yield takeLatest(BOARD_DELETE, boardDeleteSaga);
}

const initialState = {
    id              : null,
    title           : '',
    content         : '',
    board           : null,
    error           : null,
    updateId        : null,
    del             : null,
    message         : null,
    variant         : null,
    titleError      : false,
    contentError    : false,
    titleErrText    : '',
    contentErrText  : ''
};

const board = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [INITIALIZE_BOARD_VIEW]: state => ({
            ...state,
            board : null,
            del: null,
            message: null,
            variant: null
        }),
        [INITIALIZE_BOARD_ERROR]: state => ({
            ...state,
           error : null
        }),
        [BOARD_CHANGE_ERROR_FIELD]: (state, {payload: {status, key, text}}) => ({
            ...state,
            [key + "Error"]: status,
            [key + "ErrText"]: text,
        }),
        [BOARD_CHANGE_FIELD]: (state, {payload: {key, value}}) => ({
            ...state,
            [key]: value,
        }),
        [BOARD_CREATE_SUCCESS]: (state, {payload: data}) => ({
            ...state,
            id: data.id,
            message: data.message,
            variant: data.variant
        }),
        [BOARD_CREATE_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [BOARD_VIEW_SUCCESS]: (state, {payload: board}) => ({
            ...state,
            board
        }),
        [BOARD_VIEW_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [BOARD_UPDATE_SETTING]: (state, {payload: board}) => ({
            ...state,
            title: board.title,
            content: board.content,
            updateId: board.id,
        }),
        [BOARD_UPDATE_SUCCESS]: (state, {payload: data}) => ({
            ...state,
            id: data.id,
            message: data.message,
            variant: data.variant
        }),
        [BOARD_UPDATE_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [BOARD_DELETE_SUCCESS]: (state, {payload: data}) => ({
            ...state,
            del: true,
            message: data.message,
            variant: data.variant
        }),
        [BOARD_DELETE_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
    },
    initialState
)

export default board;

