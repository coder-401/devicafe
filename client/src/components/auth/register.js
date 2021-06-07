import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:5000/register', {
				username: e.target.username.value,
				email: e.target.email.value,
				password: e.target.password.value,
			});

			history.push('/login');
		} catch (error) {
			toast.error('Failed Registration');
		}
	};

	return (
		<React.Fragment>
			<form onSubmit={handleSubmit}>
				<input type="text" placeholder="username here" name="username" />
				<input type="email" placeholder="email here" name="email" />
				<input type="password" placeholder="password here" name="password" />
				<button>Register</button>
			</form>
			<ToastContainer />
		</React.Fragment>
	);
};

export default Register;
