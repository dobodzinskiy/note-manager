import * as types from '../const/actionTypes';

//actions for handling Errors 500. Opens a modal window with status and description.
export function showErrors(error) {
    return (dispatch) => {
        dispatch({
            type: types.SHOW_ERRORS,
            error
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