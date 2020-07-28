import {call, put} from 'redux-saga/effects';
import {startLoading, finishLoading} from "../modules/loading";

export const validateRequestActionTypes = type => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
};

export default function validateRequestSaga(type, request) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action) {
        yield put(startLoading());  //start Loading
        const {response, error} = yield call(request, action.payload);
        if(response) {
            yield put({
                type: SUCCESS,
                payload: response.data,
            });
        } else {
            yield put({
                type: FAILURE,
                payload: error.response.data.errors,
                error: true,
            });
        }
        yield put(finishLoading());    //end Loading
    }
}