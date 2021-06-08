import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Form, Button, Card, Nav } from 'react-bootstrap';
import './login.css';

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
			<div className="login-form">
				<Card style={{ width: '18rem', paddingBottom: '8px' }}>
					<Card.Body>
						<Card.Title>Register</Card.Title>
						<Form onSubmit={handleSubmit}>
							<Form.Group controlId="formBasicName">
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Username"
									name="username"
								/>
							</Form.Group>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Email address</Form.Label>
								<Form.Control
									type="email"
									placeholder="Enter email"
									name="email"
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
								Register
							</Button>
						</Form>
					</Card.Body>
				</Card>
				<div className="nav">
					I already have an account
					<Nav.Link href="/login">Sign-in</Nav.Link>
				</div>
			</div>
			<ToastContainer />
		</React.Fragment>
	);
};

export default Register;
