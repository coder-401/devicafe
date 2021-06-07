import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { If, Then } from 'react-if';
import Video from './../videoCall';
import Chat from './../chat';
import WhiteBoard from './../whiteBoard';
import Questions from './../questions';
import './cafe.css';

const Cafe = () => {
	const { meetingId } = useParams();

	const state = useSelector((state) => {
		return {
			token: state.signIn.token,
			user: state.signIn.user,
			questions: state.questions.questions,
		};
	});

	return (
		<If condition={state.token}>
			<Then>
				<Video meetingId={meetingId} />
				<Chat meetingId={meetingId} />
				<WhiteBoard />
				<Questions />
			</Then>
		</If>
	);
};

export default Cafe;
