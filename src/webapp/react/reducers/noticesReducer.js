import * as types from '../actions/actionTypes';

const initialState = {
    notices: [],
    activeNotice: null,
    isEditActive: false,
    isRemoveActive: false,
    isCreateModalOpen: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_NOTICES:
            return Object.assign({}, state, {
                notices: action.notices
            });
        case types.CREATE_NOTICE:
            return Object.assign({}, state, {
                notices: state.notices.concat(action.notice),
                isCreateModalOpen: false
            });
        case types.CHANGE_NOTICE:
            var noticesCopy = Object.assign({}, state.notices, {});
            var index = 0;
            for (; noticesCopy[index].id != action.notice.id; index++) {
            }
            noticesCopy.splice(index, 1, action.notice);
            return Object.assign({}, state, {
                notices: noticesCopy
            });
        case types.DELETE_NOTICE:
            return Object.assign({}, state, {
                notices: state.notices.filter(notice => notice.id != action.notice.id)
            });
        case types.OPEN_ADD_NOTICE_MODAL:
            return Object.assign({}, state, {
                isCreateModalOpen: true
            });
        case types.FOCUS_NOTICE:
            return Object.assign({}, state, {
                activeNotice: action.notice,
                isEditActive: true,
                isRemoveActive: true
            });
        default:
            return state;
    }
}