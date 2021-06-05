import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import signIn from './login';
import questions from './questions';

const reducers = combineReducers({ signIn, questions });

const store = () => {
	return createStore(reducers, composeWithDevTools());
};

export default store();
