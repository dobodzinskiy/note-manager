import * as types from '../const/actionTypes';

const initialState = {
    isErrorOpen: false,
    error: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SHOW_ERRORS:
            return Object.assign({}, state, {
                isErrorOpen: !state.isErrorOpen,
                error: action.error
            });
        case types.HIDE_ERRORS:
            return Object.assign({}, state, {
                isErrorOpen: false
            });
        default:
            return state;
    }
}
