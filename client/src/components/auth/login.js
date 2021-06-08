import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { login } from './../../reducers/login';
import { Form, Button, Card, Nav } from 'react-bootstrap';
import './login.css';

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
			<div className="login-form">
				<Card style={{ width: '18rem', paddingBottom: '8px' }}>
					<Card.Body>
						<Card.Title>Login</Card.Title>
						<Form onSubmit={handleSubmit}>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Username</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter username"
									name="username"
								/>
								<Form.Text className="text-muted">
									We'll never share your email with anyone else.
								</Form.Text>
							</Form.Group>

							<Form.Group controlId="formBasicPassword">
								<Form.Label>Password</Form.Label>
								<Form.Control
									type="password"
									placeholder="Password"
									name="password"
								/>
							</Form.Group>

							<Button className="button" variant="info" type="submit">
								Login
							</Button>
						</Form>
					</Card.Body>
				</Card>
				<div className="nav">
					Don't have an account ?<Nav.Link href="/register">register </Nav.Link>
				</div>
			</div>
			<ToastContainer />
		</React.Fragment>
	);
};

export default Login;
