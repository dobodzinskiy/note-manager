import * as types from '../const/actionTypes';
import * as api from '../api/directoriesApi';
import {showErrors} from './errorActions';
import {hashHistory} from 'react-router';

//fetch directories and open tree by id from url
export function getDirectories(id) {
    return (dispatch) => {
        return api.getDirectories().then(
            data => dispatch({
                type: types.GET_DIRECTORIES,
                id: id,
                directories: data
            }),
            error => dispatch(showErrors(error))
        )
    }
}

export function createDirectory(directory) {
    return (dispatch) => {
        return api.postDirectory(directory).then(
            data => dispatch({
                type: types.CREATE_DIRECTORY,
                directory: data
            }),
            error => dispatch(showErrors(error))
        )
    }
}
//inline editing
export function editDirectory(directory) {
    return (dispatch) => {
        dispatch({
            type: types.EDIT_DIRECTORY,
            directory
        })
    }
}

export function cancelEditDirectory() {
    return (dispatch) => {
        dispatch({
            type: types.CANCEL_EDIT_DIRECTORY
        })
    }
}

export function changeDirectory(directory) {
    return (dispatch) => {
        return api.putDirectory(directory).then(
            data => dispatch({
                type: types.CHANGE_DIRECTORY,
                directory: data
            }),
            error => dispatch(showErrors(error))
        )

    }

}

export function deleteDirectory(directory) {
    return (dispatch) => {
        return api.deleteDirectory(directory).then(
            data => dispatch({
                type: types.DELETE_DIRECTORY,
                directory: data
            }),
            error => dispatch(showErrors(error))
        )
    }

}

export function focusDirectory(directory) {
    return (dispatch) => {
        dispatch({
            type: types.FOCUS_DIRECTORY,
            directory: directory
        })
    }
}

export function openAddModal() {
    return (dispatch) => {
        dispatch({
            type: types.SHOW_ADD_DIRECTORY_MODAL,
        })
    }
}

export function openDirectory(directory) {
    return (dispatch) => {
        dispatch({
            type: types.OPEN_DIRECTORY,
            directory: directory
        });
        hashHistory.replace('/folder/' + directory.id);
    }
}
