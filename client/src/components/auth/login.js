import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { login } from './../../reducers/login';

const Login = () => {
	const dispatch = useDispatch();

	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
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

			history.push('/');
		} catch (error) {
			toast.error('Invalid Login');
		}
	};

	return (
		<React.Fragment>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="username here" name="username" />
				<input type="password" placeholder="password here" name="password" />
				<button>Login</button>
			</form>
			<ToastContainer />
		</React.Fragment>
	);
};

export default Login;
