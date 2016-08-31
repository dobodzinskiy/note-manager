import * as types from '../actions/actionTypes';

const initialState = {
    notices: [],
    isChangeActive: false,
    isDeleteActive: false
};

export default function (state = initialState, action) {
    switch (action.types) {
        case types.GET_NOTICES:
            return Object.assign({}. state, {
                notices: action.notices
            });
        case types.CREATE_NOTICE:
            return Object.assign({}, state, {
                notices: state.notices.concat(action.notice)
            });
        case types.CHANGE_NOTICE:
            var noticesCopy = Object.assign({}, state.notices, {});
            var index = 0;
            for (; noticesCopy[index].id != action.notice.id; index++) {}
            noticesCopy.splice(index, 1, action.notice);
            return Object.assign({}, state, {
                notices: noticesCopy
            });
        case types.DELETE_NOTICE:
            return Object.assign({}, state, {
                notices: state.notices.filter(notice => notice.id != action.notice.id)
            });
        default:
            return state;
    }
}