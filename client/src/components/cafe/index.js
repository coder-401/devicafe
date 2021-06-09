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
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { FaVideoSlash } from 'react-icons/fa';
import './cafe.css';
import { Button } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Cafe = () => {
	const { meetingId } = useParams();
	const [board, setBoard] = useState(false);
	const [code, setCode] = useState(false);
	const [ques, setQues] = useState(false);
	const [video, setVideo] = useState(false);
	const [table, setTable] = useState({});

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

	const handleQuestions = () => {
		setQues(!ques);
		setBoard(false);
		setCode(false);
	};

	const handleBoard = () => {
		setBoard(!board);
		setQues(false);
		setCode(false);
	};

	const handleEditor = () => {
		setCode(!code);
		setQues(false);
		setBoard(false);
	};

	const handleVideo = () => {
		setVideo(!video);
	};

	return (
		<React.Fragment>
			<div className="cafeContainer">
				<div className="sideBar">
					{table.role === 'interviewer' ? (
						state.user._id === table.owner && table.role === 'interviewer' ? (
							<h4>
								{state.user.username} the {table.role}
							</h4>
						) : (
							<h4>{state.user.username} the interviewee</h4>
						)
					) : state.user._id !== table.owner && table.role === 'interviewee' ? (
						<h4>{state.user.username} the interviewer</h4>
					) : (
						<h4>
							{state.user.username} the {table.role}
						</h4>
					)}

					{state.user._id === table.owner && table.role === 'interviewer' && (
						<React.Fragment>
							<Button onClick={handleQuestions}>Questions</Button>
						</React.Fragment>
					)}
					{state.user._id !== table.owner && table.role !== 'interviewer' && (
						<React.Fragment>
							<Button onClick={handleQuestions}>Questions</Button>
						</React.Fragment>
					)}
					<Button onClick={handleBoard}>WhiteBoard</Button>
					<Button onClick={handleEditor}>Code Editor</Button>
					<CopyToClipboard text={meetingId}>
						<span
							style={{
								padding: '2%',
								border: '1px solid',
								background: '#eee',
								borderRadius: '5px',
								cursor: 'pointer',
							}}
						>
							Click to Copy Room Id
						</span>
					</CopyToClipboard>
				</div>

				<div className="leftSide">
					{video ? (
						<BsFillCameraVideoFill
							className="viedoOnIcon"
							onClick={handleVideo}
						/>
					) : (
						<FaVideoSlash className="viedoOffIcon" onClick={handleVideo} />
					)}
					{video && <Video meetingId={meetingId} />}
					{code && <TextEditor />}
					{board && (
						<div className="shamounWB">
							<WhiteBoard />
						</div>
					)}

					<Chat meetingId={meetingId} />

					{ques && (
						<div className="shamounQU">
							<Questions />
						</div>
					)}

					{ques && (
						<div className="shamounQU">
							<Questions />
						</div>
					)}
				</div>

				<ToastContainer />
			</div>
		</React.Fragment>
	);
};

export default Cafe;
