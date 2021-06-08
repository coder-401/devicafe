import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { If, Then, Else } from 'react-if';
import Video from './../videoCall';
import Chat from './../chat';
import WhiteBoard from './../whiteBoard';
import Questions from './../questions';
import cookie from 'react-cookies';

// import './cafe.css';

const Cafe = () => {
	const { meetingId } = useParams();
	const [show, setShow] = useState(false);
	const [start, setStart] = useState(false);

	const state = useSelector((state) => {
		return {
			token: state.signIn.token,
			user: state.signIn.user,
			questions: state.questions.questions,
		};
	});

	console.log('token', cookie.load('auth'));

	console.log(meetingId);

	// useEffect(() => {
	// 	cookie.load('auth');
	// 	setTriger(!triger);
	// }, []);
	// const history = useHistory();

	const handleCall = () => {
		setStart(!start);
	};

	const handleBoard = () => {
		setShow(!show);
	};

	// const handleLogin = () => {
	// 	history.push('/login');
	// };

	return (
		<React.Fragment>
			<button onClick={handleCall}>start videoCall</button>
			{start && <Video meetingId={meetingId} />}
			<Chat meetingId={meetingId} />
			<button onClick={handleBoard}>
				{!show ? `open whiteBoard` : `close whiteBoard`}
			</button>
			{show && <WhiteBoard />}
			<Questions />
		</React.Fragment>
	);
};

export default Cafe;
