import * as types from '../actions/actionTypes';

const initialState = {
    notices: [],
    activeNotice: {},
    editableNotice: {},
    isEditActive: false,
    isRemoveActive: false,
    isCreateModalOpen: false
};
function changeNotice(editedNotice, notices) {
    var newNotices = [];
    notices.forEach((notice) => {
        if (notice.id == editedNotice.id) {
            newNotices.push(editedNotice)
        } else {
            newNotices.push(notice)
        }
    });
    return newNotices;
}
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
            return Object.assign({}, state, {
                notices: changeNotice(action.notice, state.notices),
                editableNotice: {}
            });
        case types.EDIT_NOTICE:
            return Object.assign({}, state, {
                editableNotice: action.notice,
            });
        case types.CANCEL_EDIT_NOTICE:
            return Object.assign({}, state, {
                editableNotice: {}
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