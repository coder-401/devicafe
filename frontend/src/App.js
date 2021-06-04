import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Register from './components/auth/register';
import Login from './components/auth/login';

function App() {
	const state = useSelector((state) => {
		return {
			user: state.signIn.user,
			token: state.signIn.token,
		};
	});

	return (
		<div className="App">
			<Register />
			<Login />
			<div>
				<div>{state.user.username}</div>
				<div>{state.token}</div>
			</div>
		</div>
	);
}

export default App;
