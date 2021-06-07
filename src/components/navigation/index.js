import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { If, Then } from 'react-if';

const Navigation = () => {
	const state = useSelector((state) => {
		return {
			user: state.signIn.user,
			token: state.signIn.token,
		};
	});

	return (
		<If condition={state.token}>
			<Then>
				<Link to="/questions">Our Questions</Link>
				<Link to="/community">Ask your Questions</Link>
				<Link to="/BookTable">book your table</Link>
			</Then>
		</If>
	);
};

export default Navigation;
