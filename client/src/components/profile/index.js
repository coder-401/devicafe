import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { If, Then, Else } from 'react-if';
import { ToastContainer, toast } from 'react-toastify';
import cookie from 'react-cookies';

const Profile = () => {
	const state = useSelector((state) => {
		return {
			user: state.signIn.user,
			token: state.signIn.token,
		};
	});

	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
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

			toast.success('Your Info Updated successfully', {
				autoClose: 2000,
				pauseOnHover: false,
			});
		} catch (error) {
			toast.error('Something Wrong!!!!', {
				autoClose: 2000,
				pauseOnHover: false,
			});
		}
	};

	const handleLogin = () => {
		history.push('/login');
	};

	return (
		<If condition={cookie.load('auth')}>
			<Then>
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
			</Then>
			<Else>{handleLogin}</Else>
			<ToastContainer />
		</If>
	);
};

export default Profile;
