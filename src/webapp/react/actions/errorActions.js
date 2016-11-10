import * as types from '../const/actionTypes';

export function showErrors(errors) {
    return (dispatch) => {
        dispatch({
            type: types.SHOW_ERRORS,
            errors
        })
    }
}

export function hideErrors() {
    return (dispatch) => {
        dispatch({
            type: types.HIDE_ERRORS
        })
    }
}