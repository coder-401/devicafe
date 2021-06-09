import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { login } from './../../reducers/login';
import { Form, Button, Card } from 'react-bootstrap';
import './login.css';

const Login = () => {
	const dispatch = useDispatch();

	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const username = e.target.username.value;
			const password = e.target.password.value;

			const { data } = await axios.post(
				'https://backenders-devecafe.herokuapp.com/login',
				{
					username,
					password,
				},
			);

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
			<div className="login-div" style={{ color: '#1A1A22' }}>
				<div className="login-form" style={{ margin: '0', color: '#1A1A22' }}>
					<Card
						style={{
							width: '23rem',
							padding: '3%',
							height: '400px',
							borderRadius: '15px 15px 15px 15px',
							zIndex: '3',
							boxShadow: '0px 0px 3px 2px #99BCC4',
							right: '30%',
							bottom: '13%',
							backgroundColor: 'rgb(10, 103, 117,0.75)',
							color: 'white',
							fontWeight: 'bold',
						}}
					>
						<Card.Body>
							<Card.Title style={{ textAlign: "center" }}>Login</Card.Title>
							<Form style={{
								height: "78%",
								display: "flex",
								flexDirection: "column",
								justifyContent:"space-evenly"
							}} onSubmit={handleSubmit}>
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Username</Form.Label>
									<Form.Control
										type="text"
										placeholder="Enter username"
										name="username"
									/>
								</Form.Group>

								<Form.Group controlId="formBasicPassword">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										placeholder="Password"
										name="password"
									/>
								</Form.Group>

								<Button
									className="button"
									variant="info"
									type="submit"
									style={{ display: "block", color: 'white', margin: '0 auto' }}
								>
									Login
								</Button>
							</Form>
							<div className="nav" style={{justifyContent:"center"}}>
								Don't have an account ? &nbsp;
								<Link
									style={{ color: 'white', textDecoration: 'underline' }}
									to="/register"
								>
									register{' '}
								</Link>
							</div>
						</Card.Body>
					</Card>
				</div>
				<ToastContainer />
			</div>
		</React.Fragment >
	);
};

export default Login;
