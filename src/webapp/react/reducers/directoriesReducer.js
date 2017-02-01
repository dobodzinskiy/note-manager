import * as types from '../const/actionTypes';

const initialState = {
    directories: [],
    activeDirectory: {},
    editableDirectory: {},
    isDeleteActive: false,
    isEditActive: false,
    isOpenAddModal: false,
};

function createDirectories(directories, id) {
    let directory = directories.find(directory => directory.id == id);
    directory.isOpen = true;
    if (directory.parentId) {
        createDirectories(directories, directory.parentId);
    }
    return directories;
}

function openDirectory(directory, directories) {
    let newDirectories = [];
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

function changeDirectory(editedDirectory, directories) {
    let newDirectories = [];
    directories.forEach((directory) => {
        if (directory.id == editedDirectory.id) {
            newDirectories.push(editedDirectory)
        } else {
            newDirectories.push(directory)
        }
    });
    return newDirectories;
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.GET_DIRECTORIES:
            return Object.assign({}, state, {
                directories: createDirectories(action.directories, action.id)
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
            return Object.assign({}, state, {
                directories: changeDirectory(action.directory, state.directories),
                editableDirectory: {}
            });
        case types.DELETE_DIRECTORY:
            return Object.assign({}, state, {
                directories: state.directories.filter(directory => directory.id != action.directory.id)
            });
        case types.FOCUS_DIRECTORY:
            if (action.directory.id == 1) {
                return Object.assign({}, state, {
                    activeDirectory: null,
                    isEditActive: false,
                    isDeleteActive: false
                })
            } else {
                return Object.assign({}, state, {
                    activeDirectory: action.directory,
                    isEditActive: true,
                    isDeleteActive: true
                });
            }
        case types.SHOW_ADD_DIRECTORY_MODAL:
            return Object.assign({}, state, {
                isOpenAddModal: !state.isOpenAddModal,
            });
        case types.EDIT_DIRECTORY:
            return Object.assign({}, state, {
                editableDirectory: action.directory
            });
        case types.CANCEL_EDIT_DIRECTORY:
            return Object.assign({}, state, {
                editableDirectory: {}
            });
        default:
            return state;
    }
}