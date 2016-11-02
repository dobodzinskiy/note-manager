import directoriesReducer from './directoriesReducer';
import noticesReducer from './noticesReducer';
import {combineReducers} from 'redux';

export default combineReducers({
    directoriesState: directoriesReducer,
    noticesState: noticesReducer
});

