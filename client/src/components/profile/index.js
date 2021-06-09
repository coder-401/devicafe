import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { If, Then, Else } from 'react-if';
import { ToastContainer, toast } from 'react-toastify';
import cookie from 'react-cookies';
import { Button, Form } from 'react-bootstrap';
import Avatar from 'react-avatar';
import './profile.css';

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
				`https://backenders-devecafe.herokuapp.com/profile/${state.user._id}`,
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
				<div id="profileGrid">
					<div className="rightRight">
						<Avatar
							textMarginRatio={0.2}
							textSizeRatio={2}
							name={state.user.username}
							size="90"
							round={true}
						/>
						<h3>{state.user.username}</h3>

						<Avatar
							src="https://www.google.com/gmail/about/static/images/logo-gmail.png?cache=1adba63"
							size="90"
							round={true}
						/>
						<p style={{ margin: '0' }} id="emailCard">
							{state.user.email}
						</p>
					</div>

					<div className="leftLeft">
						<Form
							className="profileForm"
							onSubmit={handleSubmit}
							style={{ marginBottom: '5%' }}
						>
							<legend style={{ textAlign: 'center' }}>Update Your Info</legend>
							<Form.Label>Username</Form.Label>
							<Form.Control
								defaultValue={state.user.username}
								placeholder="username here"
								name="username"
							/>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								defaultValue={state.user.email}
								placeholder="email here"
								name="email"
							/>
							<Form.Label>Password</Form.Label>
							<Form.Control
								required
								type="password"
								placeholder="password here"
								name="password"
							/>
							<Button type="submit">Update</Button>
						</Form>
					</div>
				</div>
				<ToastContainer />
			</Then>
			<Else>{handleLogin}</Else>
		</If>
	);
};

export default Profile;
