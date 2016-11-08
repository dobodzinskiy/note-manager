import * as types from './actionTypes';
import * as api from '../api/noticesApi';
import {showErrors} from './errorActions';


export function getNotices() {
    return (dispatch) => {
        return api.getNotices().then(
            data => dispatch({
                type: types.GET_NOTICES,
                notices: data
            }),
            error => showErrors(error)
        )
    }
}

export function createNotice(notice) {
    return (dispatch) => {
        return api.postNotice(notice).then(
            data => dispatch({
                type: types.CREATE_NOTICE,
                notice: data
            }),
            error => showErrors(error)
        )
    }
}

export function changeNotice(notice) {
    return (dispatch) => {
        return api.putNotice(notice).then(
            data => dispatch({
                type: types.CHANGE_NOTICE,
                notice: data
            }),
            error => showErrors(error)
        )
    }
}

export function editNotice(notice) {
    return (dispatch) => {
        dispatch({
            type: types.EDIT_NOTICE,
            notice
        })
    }
}

export function cancelEditNotice() {
    return (dispatch) => {
        dispatch({
            type: types.CANCEL_EDIT_NOTICE
        })
    }
}

export function deleteNotice(notice) {
    return (dispatch) => {
        return api.deleteNotice(notice).then(
            data => dispatch({
                type: types.DELETE_NOTICE,
                notice: data
            }),
            error => showErrors(error)
        )
    }
}

export function focusNotice(notice) {
    return (dispatch) => {
        dispatch({
            type: types.FOCUS_NOTICE,
            notice
        })
    }
}

export function openAddNoticeModal() {
    return (dispatch) => {
        dispatch({
            type: types.OPEN_ADD_NOTICE_MODAL,
        })
    }
}
