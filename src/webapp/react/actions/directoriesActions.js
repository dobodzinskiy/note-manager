import * as types from './actionTypes';
import * as api from '../api/directoriesApi';
import { showErrors } from './errorActions';

export function getDirectories() {
    return (dispatch) => {
        return api.getDirectories().then(
            data => dispatch({
                type: types.GET_DIRECTORIES,
                directories: data
            }),
            error => showErrors(error)
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
            error => showErrors(error)
        )
    }
}

export function changeDirectory(directory) {
    return (dispatch) => {
        return api.putDirectory(directory).then(
            data => dispatch({
                type: types.CHANGE_DIRECTORY,
                directory: data
            }),
            error => showErrors(error)
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
            error => showErrors(error)
        )

    }

}
