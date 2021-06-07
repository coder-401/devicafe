import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Video from './../videoCall';
import Chat from './../chat';
import WhiteBoard from './../whiteBoard';
// import TextEditor from './../textEditor';

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
		<React.Fragment>
			<Video meetingId={meetingId} />
			<Chat meetingId={meetingId} />
			<WhiteBoard />
			{/* <TextEditor /> */}
		</React.Fragment>
	);
};

export default Cafe;
