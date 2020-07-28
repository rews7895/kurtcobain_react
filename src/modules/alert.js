import {createAction, handleActions} from 'redux-actions';

const SET_ALERT = 'alert/SET_ALERT';
const DELETE_ALERT = 'alert/DELETE_ALERT';

export const setAlert = createAction(SET_ALERT);
export const deleteAlert = createAction(DELETE_ALERT);

const initialState = {
    message: null,
    variant: null
}

export default handleActions(
    {
        [SET_ALERT]: (state, {payload: alert}) => ({
            ...state,
            message: alert.message,
            variant: alert.variant
        }),
        [DELETE_ALERT]: state => ({
            ...state,
            message: null,
            variant: null
        }),
    },
    initialState
);