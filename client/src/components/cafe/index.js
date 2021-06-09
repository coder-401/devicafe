import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Video from './../videoCall';
import Chat from './../chat';
import WhiteBoard from './../whiteBoard';
import Questions from './../questions';
import cookie from 'react-cookies';
import TextEditor from './../textEditor';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

// import './cafe.css';

const Cafe = () => {
	const { meetingId } = useParams();
	const [show, setShow] = useState(false);
	const [start, setStart] = useState(false);
	const [table, setTable] = useState(false);

	const state = useSelector((state) => {
		return {
			token: state.signIn.token,
			user: state.signIn.user,
			questions: state.questions.questions,
		};
	});

	useEffect(async () => {
		try {
			const { data } = await axios.get(
				`https://backenders-devecafe.herokuapp.com/table/${meetingId}`,
				{
					headers: {
						Authorization: `Bearer ${cookie.load('auth')}`,
					},
				},
			);

			setTable(data);
		} catch (error) {
			toast.error('Something Wrong!!!!', {
				autoClose: 2000,
				pauseOnHover: false,
			});
		}
	}, []);

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
			<TextEditor />
			<button onClick={handleCall}>start videoCall</button>
			{start && <Video meetingId={meetingId} />}
			<Chat meetingId={meetingId} />
			<button onClick={handleBoard}>
				{!show ? `open whiteBoard` : `close whiteBoard`}
			</button>
			{show && <WhiteBoard />}
			{state.user._id === table.owner && table.role === 'interviewer' ? (
				<div>
					{/* <Questions /> */}
				</div>
			) : (
				<div></div>
			)}

			{state.user._id !== table.owner && table.role !== 'interviewer' ? (
				<Questions />
			) : (
				<div></div>
			)}
			<ToastContainer />
		</React.Fragment>
	);
};

export default Cafe;
