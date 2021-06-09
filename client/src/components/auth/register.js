import React from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { Form, Button, Card } from 'react-bootstrap';
import './login.css';

const Register = () => {
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post('https://backenders-devecafe.herokuapp.com/register', {
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
			<div className="reg-div">
				<div className="reg-form">
					<Card
						style={{
							color: 'white',
							fontWeight: 'bold',
							width: '30rem',
							padding: '3%',
							height: '500px',
							borderRadius: '15px 15px 15px 15px',
							zIndex: '3',
							boxShadow: '0px 0px 3px 2px #99BCC4',
							right: '15%',
							bottom: '10%',
							backgroundColor: 'rgb(10, 103, 117,0.75)',
						}}
					>
						<Card.Body>
							<Card.Title style={{textAlign:"center"}}>Register</Card.Title>
							<Form style={{display:"flex",flexDirection:"column",height:"85%",justifyContent:"space-between"}} onSubmit={handleSubmit}>
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
									<Form.Text style={{ color: 'white' }}>
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

								<Button style={{display:"block",margin:"auto"}} className="button" variant="info" type="submit">
									Register
								</Button>
							</Form>
							<div className="nav" style={{justifyContent:"center"}}>
								I already have an account &nbsp;
								<Link
									to="/login"
									style={{ color: 'white', textDecoration: 'underline' }}
								>
									Sign-in
								</Link>
							</div>
						</Card.Body>
					</Card>
				</div>
				<ToastContainer />
			</div>
		</React.Fragment>
	);
};

export default Register;
