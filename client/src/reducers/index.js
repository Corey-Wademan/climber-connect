import { combineReducers } from "redux";
import alert from './alert';
import auth from "./auth";
import profile from './profile'
import post from './post'
// Because this file is named index we can simply import this file into the store which combines all reducers from the reducers folder

export default combineReducers( {
    alert,
    auth,
    profile,
    post
} );