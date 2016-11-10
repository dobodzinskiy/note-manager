import * as types from '../const/actionTypes';
import * as searchTypes from '../const/searchTypes';

const initialState = {
    notices: [],
    activeNotice: {},
    editableNotice: {},
    isEditActive: false,
    isRemoveActive: false,
    isCreateModalOpen: false,

    searchWord: '',
    searchType: null,
    foundNotices: [],
    isSearchModalOpen: false
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

function searchNotices(searchType, searchWord, notices) {
    var foundNotices = [];
    switch (searchType) {
        case searchTypes.SIMPLE_SEARCH:
            notices.forEach((notice) => {
                if (notice.title.includes(searchWord)) {
                    foundNotices.push(notice);
                }
            });
            return foundNotices;
        case searchTypes.FULL_SEARCH:
            notices.forEach((notice) => {
                if (notice.title.includes(searchWord) ||
                    notice.description.includes(searchWord) ||
                    notice.tags.toString().includes(searchWord)) {

                    foundNotices.push(notice);

                }
            });
            return foundNotices;
        default:
            return foundNotices;
    }
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
                isCreateModalOpen: !state.isCreateModalOpen
            });
        case types.FOCUS_NOTICE:
            return Object.assign({}, state, {
                activeNotice: action.notice,
                isEditActive: true,
                isRemoveActive: true
            });
        case types.SET_SEARCH_WORD:
            return Object.assign({}, state, {
                searchWord: action.searchWord
            });
        case types.SEARCH_NOTICES:
            return Object.assign({}, state, {
                searchType: action.searchType,
                foundNotices: searchNotices(action.searchType, state.searchWord, action.notices),
                isSearchModalOpen: false
            });
        case types.OPEN_SEARCH_MODAL:
            return Object.assign({}, state, {
                isSearchModalOpen: !state.isSearchModalOpen
            });
        case types.SET_NOTICES:
            return Object.assign({}, state, {
                notices: action.notices
            });
        default:
            return state;
    }
}