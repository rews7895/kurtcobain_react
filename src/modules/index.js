import {combineReducers} from "redux";
import {all} from 'redux-saga/effects';
import user from './user';
import loading from "./loading";
import alert from "./alert";
import board, {boardSaga} from "./board";
import boards, {boardsSaga} from "./boards";
import reply, {replySaga} from "./reply";

const rootReducer = combineReducers({
   user,
   loading,
   alert,
   board,
   boards,
   reply,
});

export function* rootSaga() {
   yield all([boardSaga(), boardsSaga(), replySaga()]);
}

export default rootReducer;