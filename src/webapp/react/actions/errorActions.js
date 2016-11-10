import * as types from '../const/actionTypes';

export function showErrors(errors) {
    return ({
        type: types.SHOW_ERRORS,
        errors
    })

}