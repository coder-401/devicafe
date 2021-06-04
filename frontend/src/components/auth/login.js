import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { login } from './../../reducers/login';

const Login = () => {
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const username = e.target.username.value;
		const password = e.target.password.value;

		const { data } = await axios.post('http://localhost:5000/login', {
			username,
			password,
		});

		dispatch(
			login({
				user: data.user,
				token: data.token,
			}),
		);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" placeholder="username here" name="username" />
			<input type="password" placeholder="password here" name="password" />
			<button>Login</button>
		</form>
	);
};

export default Login;
