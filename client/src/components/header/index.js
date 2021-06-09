import React, { useEffect } from 'react';
import {Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { If, Else, Then } from 'react-if';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import { login, logout } from './../../reducers/login';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const Header = () => {
	const dispatch = useDispatch();

	const state = useSelector((state) => {
		return {
			user: state.signIn.user,
			token: state.signIn.token,
		};
	});

	useEffect(() => {
		const token = cookie.load('auth');
		validateToken(token);
	}, []);

	function validateToken(token) {
		try {
			const user = jwt.decode(token);
			if (user) {
				dispatch(login({ user, token }));
			}
		} catch (error) {
			dispatch(login({ user: '', token: '' }));
		}
	}

	function logoutHandle() {
		dispatch(logout({ user: '', token: '' }));
	}

	return (
		<React.Fragment>
			<If condition={state.user}>
				<Then>
					<Navbar
						expand="lg"
						style={{
							background: 'rgba(8, 83, 93,0.7)',
							borderBlockColor: 'transparent',
							zIndex: '7000',
							fontWeight: 'bold',
							position: 'fixed',
							top: '0',
							width: '100%',
						}}
						class="float-right"
					>
						<Navbar.Brand
							href="/"
							style={{
								marginRight: '60%',
								fontSize: '150%',
								fontWeight: 'bold',
								color: '#f2f6f7',
							}}
						>
							EnterVU
						</Navbar.Brand>
						<Container>
							<Navbar.Toggle aria-controls="responsive-navbar-nav" />
							<Navbar.Collapse id="responsive-navbar-nav">
								<Nav>
									<Link to="/" style={{ color: '#f2f6f7',
									top: "5%",
									color: "rgb(242, 246, 247)",
									margin: "2%",
									padding:" 1%", }}>
										Home
									</Link>
									<Link to="/questions" style={{ color: '#f2f6f7',
									top: "5%",
									color: "rgb(242, 246, 247)",
									margin: "2%",
									padding:" 1%", }}>
										Questions
									</Link>
									<Link to="/BookTable" style={{ color: '#f2f6f7',
									top: "5%",
									color: "rgb(242, 246, 247)",
									margin: "2%",
									marginRight:"2%",
									padding:" 1%", }}>
										BookRoom
									</Link>
									<Link to="/community" style={{ color: '#f2f6f7',
									top: "5%",
									color: "rgb(242, 246, 247)",
									margin: "2%",
									padding:" 1%", }}>
										Community
									</Link>
									<NavDropdown title={state.user.username} id="nav-dropdown">
										<NavDropdown.Item href="/profile" eventKey="4.1">
											Profile
										</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item
											href="/"
											onClick={logoutHandle}
											eventKey="4.1"
										>
											logout
										</NavDropdown.Item>
									</NavDropdown>
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				</Then>
				<Else>
					<Navbar
						expand="lg"
						style={{
							background: 'rgba(8, 83, 93,0.7)',
							borderBlockColor: 'transparent',
							zIndex: '7000',
							fontWeight: 'bold',
							position: 'fixed',
							top: '0',
							width: '100%',
						}}
						class="float-right"
					>
						<Navbar.Brand
							href="/"
							style={{
								marginRight: '75%',
								fontSize: '150%',
								fontWeight: 'bold',
								color: '#f2f6f7',
							}}
						>
							EnterVU
						</Navbar.Brand>
						<Container>
							<Navbar.Toggle aria-controls="responsive-navbar-nav" />
							<Navbar.Collapse id="responsive-navbar-nav">
								<Nav>
									<Link
										to="/login"
										style={{ color: '#f2f6f7',
									top: "5%",
									color: "rgb(242, 246, 247)",
									margin: "2%",
									padding:" 1%", }}
									>
										Login
									</Link>
									<Link to="/register" style={{ color: '#f2f6f7',
									top: "5%",
									color: "rgb(242, 246, 247)",
									margin: "2%",
									padding:" 1%", }}>
										Register
									</Link>
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				</Else>
			</If>
		</React.Fragment>
	);
};

export default Header;
