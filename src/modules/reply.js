import {createAction, handleActions} from 'redux-actions';
import createRequestSaga, {
    createRequestActionTypes
} from "../lib/createRequestSaga";
import validateRequestSaga, {
    validateRequestActionTypes
} from "../lib/validateRequestSaga";
import * as replyAPI from '../lib/api/reply';
import {takeLatest} from 'redux-saga/effects';

// 초기화
const INITIALIZE = 'reply/INITIALIZE';

const INITIALIZE_MESSAGE = 'reply/INITIALIZE_MESSAGE';

// 에러 초기화
const INITIALIZE_ERROR = 'reply/INITIALIZE_ERROR';

// 필드 입력
const REPLY_CHANGE_FIELD = 'reply/REPLY_CHANGE_FIELD';

// 수정 타겟
const UPDATE_TARGET_ID_CHANGE = 'reply/UPDATE_TARGET_ID_CHANGE';

// 답글 타겟
const CREATE_TARGET_ID_CHANGE = 'reply/CREATE_TARGET_ID_CHANGE'

// 댓글 리스트 출력
const [
    REPLY_LIST,
    REPLY_LIST_SUCCESS,
    REPLY_LIST_FAILURE
] = createRequestActionTypes('reply/REPLY_LIST');

// 최하단부 댓글
const [
    REPLY_CREATE,
    REPLY_CREATE_SUCCESS,
    REPLY_CREATE_FAILURE
] = validateRequestActionTypes('reply/REPLY_CREATE');

const [
    REPLY_UPDATE,
    REPLY_UPDATE_SUCCESS,
    REPLY_UPDATE_FAILURE
] = validateRequestActionTypes('reply/REPLY_UPDATE');

const [
    REPLY_DELETE,
    REPLY_DELETE_SUCCESS,
    REPLY_DELETE_FAILURE
] = validateRequestActionTypes('reply/REPLY_DELETE');

export const initialize = createAction(INITIALIZE);

export const initializeMessage = createAction(INITIALIZE_MESSAGE);

export const initializeError = createAction(INITIALIZE_ERROR);

export const replyChangeField = createAction(REPLY_CHANGE_FIELD, ({key, value}) => ({
    key,
    value
}));

export const updateTargetIdChange = createAction(UPDATE_TARGET_ID_CHANGE, ({updateTargetId}) => ({
    updateTargetId
}));

export const createTargetIdChange = createAction(CREATE_TARGET_ID_CHANGE, ({createTargetId}) => ({
    createTargetId
}))

export const replyCreate = createAction(REPLY_CREATE, ({boardId, content, originId, toUserId}) => ({
    boardId, content, originId, toUserId
}));

export const replyUpdate = createAction(REPLY_UPDATE, ({boardId, id, content}) => ({
    boardId, id, content
}));

export const replyDelete = createAction(REPLY_DELETE, ({id}) => ({
    id
}));

export const replyList = createAction(REPLY_LIST, ({boardId}) => ({
   boardId
}));

const replyCreateSaga = validateRequestSaga(REPLY_CREATE, replyAPI.replySave);

const replyUpdateSaga = validateRequestSaga(REPLY_UPDATE, replyAPI.replyUpdate);

const replyDeleteSaga = validateRequestSaga(REPLY_DELETE, replyAPI.replyDelete);

const replyListSaga = createRequestSaga(REPLY_LIST, replyAPI.replyList)

export function* replySaga() {
    yield takeLatest(REPLY_CREATE, replyCreateSaga);
    yield takeLatest(REPLY_UPDATE, replyUpdateSaga);
    yield takeLatest(REPLY_DELETE, replyDeleteSaga);
    yield takeLatest(REPLY_LIST, replyListSaga);
}

const initialState = {
    // 댓글
    replyContent: '',
    // 댓글 리스트
    replies: [],
    error: null,
    message: null,
    variant: null,
    //수정버튼 클릭시
    updateTargetId: null,
    updateContent: '',
    //답글
    createTargetId: null,
    createContent: ''
};

const reply = handleActions(
    {
        [INITIALIZE]: state => initialState,
        [INITIALIZE_MESSAGE]: state => ({
            ...state,
            message: null,
            variant: null,
        }),
        [INITIALIZE_ERROR]: state => ({
            ...state,
            error: null
        }),
        [REPLY_CHANGE_FIELD]: (state, {payload: {key, value}}) => ({
            ...state,
            [key] : value
        }),
        [UPDATE_TARGET_ID_CHANGE]: (state, {payload: {updateTargetId}}) => ({
            ...state,
            updateTargetId: updateTargetId,
            updateContent: ''
        }),
        [CREATE_TARGET_ID_CHANGE]: (state, {payload: {createTargetId}}) => ({
            ...state,
            createTargetId: createTargetId,
            createContent: ''
        }),
        [REPLY_CREATE_SUCCESS]: (state, {payload: data}) => ({
            ...state,
            message: data.message,
            variant: data.variant,
            replyContent: '',
            createTargetId: null,
            createContent: ''
        }),
        [REPLY_CREATE_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [REPLY_UPDATE_SUCCESS]: (state, {payload: data}) => ({
            ...state,
            message: data.message,
            variant: data.variant,
            updateTargetId: null,
            updateContent: ''
        }),
        [REPLY_UPDATE_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [REPLY_DELETE_SUCCESS]: (state, {payload: data}) => ({
            ...state,
            message: data.message,
            variant: data.variant,
        }),
        [REPLY_DELETE_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
        [REPLY_LIST_SUCCESS]: (state, {payload: data}) => ({
            ...state,
            replies: data.replies
        }),
        [REPLY_LIST_FAILURE]: (state, {payload: error}) => ({
            ...state,
            error,
        }),
    },
    initialState
)

export default reply;

