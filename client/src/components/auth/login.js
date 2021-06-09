import React from 'react';
import { useHistory,Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import { login } from './../../reducers/login';
import { Form, Button, Card, Nav, Row, Col} from 'react-bootstrap';
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
			<div className="login-div" style={{color:"#1A1A22"}}>
				<Row style={{margin:"0",marginBottom:"5%"}}>
					<Col >
						<div className="login-form" style={{ margin: "0" ,color:"#1A1A22"}}>
							<Card style=
								{{
									width: '23rem',
									padding: '3%',
									height: "400px",
									borderRadius: "15px 15px 15px 15px",
									zIndex: "3",
									boxShadow: "5px 10px 18px #99BCC4",
									right: "30%",
									bottom:"13%",
									backgroundColor:"rgb(10, 103, 117,0.9)",
									color:"white",
									fontWeight:"bold"
								}}>
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
										</Form.Group>

										<Form.Group controlId="formBasicPassword">
											<Form.Label>Password</Form.Label>
											<Form.Control
												type="password"
												placeholder="Password"
												name="password"
											/>
										</Form.Group>

										<Button className="button"  type="submit" style={{color:"white"}}>
											Login
										</Button>
									</Form>
									<div className="nav">
										Don't have an account ?<Link style={{color:"white",textDecoration:"underline"}} to="/register">register </Link>
									</div>
								</Card.Body>
							</Card>
						</div>
						<ToastContainer />
					</Col>
					<Col>
						<img src="http://cdn.shopify.com/s/files/1/1543/0863/products/mask_gif_1200x1200.gif?v=1569565381" style=
							{{
								width: '40rem',
								height: "500px",
								marginTop: "12%",
								borderRadius: "15px 15px 15px 15px",
								zIndex: "3",
								boxShadow: "5px 10px 18px #99BCC4",
							}}alt="" />
					</Col>
				</Row>
			</div>
		</React.Fragment>
	);
};

export default Login;
