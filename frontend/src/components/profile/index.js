import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { If, Then, Else } from 'react-if';

const Profile = () => {
	const state = useSelector((state) => {
		return {
			user: state.signIn.user,
			token: state.signIn.token,
		};
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios.put(
			`http://localhost:5000/profile/${state.user._id}`,
			{
				username: e.target.username.value,
				email: e.target.email.value,
				password: e.target.password.value,
			},
			{
				headers: {
					Authorization: `Bearer ${state.token}`,
				},
			},
		);
	};

	return (
		<React.Fragment>
			<div>
				<div>{state.user.username}</div>
				<div>{state.user.email}</div>
			</div>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					defaultValue={state.user.username}
					placeholder="username here"
					name="username"
				/>
				<input
					type="email"
					defaultValue={state.user.email}
					placeholder="email here"
					name="email"
				/>
				<input
					type="password"
					defaultValue={state.user.password}
					placeholder="password here"
					name="password"
				/>
				<button>Update</button>
			</form>
		</React.Fragment>
	);
};

export default Profile;
