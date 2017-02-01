import directoriesReducer from './directoriesReducer';
import noticesReducer from './noticesReducer';
import errorsReducer from './errorsReducer';
import {combineReducers} from 'redux';

export default combineReducers({
    directoriesState: directoriesReducer,
    noticesState: noticesReducer,
    errorsState: errorsReducer
});

