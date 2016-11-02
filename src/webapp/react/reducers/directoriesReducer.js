import * as types from '../actions/actionTypes';

const initialState = {
    directories: [],
    activeDirectory: {},
    isDeleteActive: false,
    isEditActive: false,
    isOpenAddModal: false,
};

function createDirectories(directories) {
    var directoriesArray = [];
    directories.forEach((directory) => {
        directory.isOpen = directory.id == 1;
        directoriesArray.push(directory);
    });
    return directoriesArray;
}

function openDirectory(directory, directories) {
    var newDirectories = [];
    directories.forEach((directoryOld) => {
        if (directoryOld.id == directory.id) {
            directoryOld.isOpen = !directoryOld.isOpen;
            newDirectories.push(directoryOld);
        } else {
            newDirectories.push(directoryOld)
        }
    });
    return newDirectories;
}
export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_DIRECTORIES:
            return Object.assign({}, state, {
                directories: createDirectories(action.directories)
            });
        case types.OPEN_DIRECTORY:
            return Object.assign({}, state, {
                directories: openDirectory(action.directory, state.directories)
            });
        case types.CREATE_DIRECTORY:
            return Object.assign({}, state, {
                directories: state.directories.concat(action.directory),
                isOpenAddModal: false
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
        case types.FOCUS_DIRECTORY:
            return Object.assign({}, state, {
                activeDirectory: action.directory,
                isEditActive: true,
                isDeleteActive: true
            });
        case types.SHOW_ADD_DIRECTORY_MODAL:
            return Object.assign({}, state, {
                isOpenAddModal: !state.isOpenAddModal,
            });
        default: return state;
    }
}