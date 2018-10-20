import { combineReducers } from 'redux';
import comments from './comments';
import users from './users';

const initialState = {
    comments: [],
    users: []
};

const app = combineReducers({
    comments,
    users
});