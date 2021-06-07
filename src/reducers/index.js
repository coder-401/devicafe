import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import signIn from './login';
import questions from './questions';
import posts from './posts';
import comments from './comments';

const reducers = combineReducers({ signIn, questions, posts, comments });

const store = () => {
	return createStore(reducers, composeWithDevTools());
};

export default store();
