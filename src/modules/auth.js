import {createAction, handleActions} from 'redux-actions';
// import produce from "immer";
import {takeLatest, call} from 'redux-saga/effects';
// import createRequestSaga, {createRequestActionTypes} from "../lib/createRequestSaga";
import * as authAPI from '../lib/api/auth';

const SAMPLE_ACTION = 'auth/SAMPLE_ACTION';

const initialState = {
};

const auth = handleActions(
    {
        [SAMPLE_ACTION]: (state, action) => state,
    },
    initialState
);

export default auth;