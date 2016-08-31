import directoriesReducer from './directoriesReducer';
import noticesReducer from './noticesReducer';
import {combineReducers} from 'redux';

module.exports = combineReducers({
    directoriesState: directoriesReducer,
    noticesState: noticesReducer
});

