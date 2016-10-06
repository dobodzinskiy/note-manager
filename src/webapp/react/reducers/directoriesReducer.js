import * as types from '../actions/actionTypes';

const initialState = {
    directories: [],
    activeDirectory: null,
    isDeleteActive: false,
    isEditActive: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_DIRECTORIES:
            return Object.assign({}, state, {
                directories: action.directories
            });
        case types.CREATE_DIRECTORY:
            return Object.assign({}, state, {
                directories: state.directories.concat(action.directory)
            });
        case types.CHANGE_DIRECTORY:
            var directoriesCopy = Object.assign({}, state.directories, {});
            var index = 0;
            for (; directoriesCopy[index].id != action.directory.id; index++) {}
            directoriesCopy.splice(index, 1, action.directory);
            return Object.assign({}, state, {
                directories: directoriesCopy
            });
        case types.DELETE_DIRECTORY:
            return Object.assign({}, state, {
                directories: state.directories.filter(directory => directory.id != action.directory.id)
            });
        default: return state;
    }
}