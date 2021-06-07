import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { If, Then } from 'react-if';
import Video from './../videoCall';
import Chat from './../chat';
import WhiteBoard from './../whiteBoard';
import Questions from './../questions';
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

	const handleCall = () => {
		setStart(!start);
	};

	const handleBoard = () => {
		setShow(!show);
	};

	return (
		<If condition={state.token}>
			<Then>
				<button onClick={handleCall}>start videoCall</button>
				{start && <Video meetingId={meetingId} />}
				<Chat meetingId={meetingId} />
				<button style={{ zIndex: 10 }} onClick={handleBoard}>
					{!show ? `open whiteBoard` : `close whiteBoard`}
				</button>
				{show && <WhiteBoard />}
				<Questions />
			</Then>
		</If>
	);
};

export default Cafe;
