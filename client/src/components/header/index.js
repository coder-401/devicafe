import React, { useEffect } from 'react';
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
					<Navbar expand="lg" style={{background:"transparent",borderBlockColor:"transparent", zIndex:"3"}} class="float-right">
						<Navbar.Brand href="/" style={{ marginRight: '70%', fontSize:"150%", fontWeight:"bold" }}>Mocky</Navbar.Brand>
						<Container>
							<Navbar.Toggle aria-controls="responsive-navbar-nav" />
							<Navbar.Collapse id="responsive-navbar-nav">

								<Nav>
									<Nav.Link href="/questions">QUESTIONS</Nav.Link>
									<Nav.Link href="/BookTable">GET TABLE</Nav.Link>
									<NavDropdown title="ACCOUNT" id="collasible-nav-dropdown">
										<NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
										<NavDropdown.Divider />
										<NavDropdown.Item href="/" onClick={logoutHandle}>logout</NavDropdown.Item>
									</NavDropdown>
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				</Then>
				<Else>
				<Navbar expand="lg" style={{background:"transparent",borderBlockColor:"transparent"}} class="float-right">
						<Navbar.Brand href="/" style={{ marginRight: '70%' }}>DeveCafe</Navbar.Brand>
						<Container>
							<Navbar.Toggle aria-controls="responsive-navbar-nav" />
							<Navbar.Collapse id="responsive-navbar-nav">

								<Nav>
									<Nav.Link href="/login">LOGIN</Nav.Link>
									<Nav.Link href="/register">REGISTER</Nav.Link>
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
