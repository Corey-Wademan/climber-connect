import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// Imports combineReducer from index which holds all reducers in reducers folder
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore( rootReducer, initialState, composeWithDevTools( applyMiddleware( ...middleware ) ) );

export default store; 