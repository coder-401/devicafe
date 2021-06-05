import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { If, Else, Then } from 'react-if';
import cookie from 'react-cookies';
import jwt from 'jsonwebtoken';
import { Link, useHistory } from 'react-router-dom';
import { login, logout } from './../../reducers/login';

const Header = () => {
	const dispatch = useDispatch();
	const history = useHistory();

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
				history.push('/');
			}
		} catch (error) {
			dispatch(login({ user: '', token: '' }));
		}
	}

	function logoutHandle() {
		dispatch(logout({ user: '', token: '' }));
	}

	return (
		<If condition={state.user}>
			<Then>
				<span>header</span> <Link to="/profile">{state.user.username}</Link>
				<Link to="/" onClick={logoutHandle}>
					logout
				</Link>
				<Link to="/call">Video</Link>
				<Link to="/posts">Posts</Link>
			</Then>
			<Else>
				<span>header</span>
				<Link to="/login">login</Link>
				<Link to="/register">register</Link>
			</Else>
		</If>
	);
};

export default Header;
