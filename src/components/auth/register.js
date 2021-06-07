import React from 'react';
import axios from 'axios';

const Register = () => {
	const handleSubmit = async (e) => {
		e.preventDefault();

		await axios.post('http://localhost:5000/register', {
			username: e.target.username.value,
			email: e.target.email.value,
			password: e.target.password.value,
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" placeholder="username here" name="username" />
			<input type="email" placeholder="email here" name="email" />
			<input type="password" placeholder="password here" name="password" />
			<button>Register</button>
		</form>
	);
};

export default Register;
