import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LoginContext } from '../context/login';
import { If, Then, Else } from 'react-if';

const Navigation = () => {
	const loginContext = useContext(LoginContext);
	const history = useHistory();

	const handleClick = () => {
		history.push('/');
		loginContext.logout();
	};

	return (
		<If condition={loginContext.loggedIn && localStorage.getItem('token')}>
			<Then>
				<Link to="/dashboard"> Dashboard </Link>
				<Link to="/newArticle"> NewArticle </Link>
				<button onClick={handleClick}>logout</button>
			</Then>
			<Else>
				<Link to="/register"> Register </Link>
				<Link to="/login"> Login </Link>
			</Else>
		</If>
	);
};

export default Navigation;
