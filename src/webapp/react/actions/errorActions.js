import * as types from './actionTypes';

export function showErrors(errors) {
    return ({
        type: types.SHOW_ERRORS,
        errors
    })

}