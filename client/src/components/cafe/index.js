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
	const [trigger, setTrigger] = useState(true);

	const state = useSelector((state) => {
		return {
			token: state.signIn.token,
			user: state.signIn.user,
			questions: state.questions.questions,
		};
	});

	// eslint-disable-next-line
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
		// eslint-disable-next-line
	}, []);

	const handleQuestions = () => {
		setQues(!ques);
		setBoard(false);
		setCode(false);

		if(video){
			if(!ques) {
				fixVideo()
			}else{
				originVideo()
			}
		}
		setTrigger(!trigger)

	};

	const handleBoard = () => {
		setBoard(!board);
		setQues(false);
		setCode(false);
		if(video){
			if(!board) {
				fixVideo()
			}else{
				originVideo()
			}
		}
		setTrigger(!trigger)
	};

	const handleEditor = () => {
		setCode(!code);
		setQues(false);
		setBoard(false);
		if(video){
			if(!code) {
				fixVideo()
			}else{
				originVideo()
			}
		}
		setTrigger(!trigger)
	};

	const handleVideo = () => {
		setVideo(!video);
		
		setTimeout(() => {
			if(!video){
				if(trigger){
					originVideo()
				}else{
					fixVideo()
				}
			}
	},3000)
	};

	const fixVideo = () => {
		let video1 = document.querySelector('.jvCTkj').firstChild;
		let video2 = document.querySelector('.jvCTkj').lastChild;

		video1.style.position = 'fixed';
		video1.style.zIndex = '100000000';
		video1.style.height = '126px';
		video1.style.width = '270px';
		video1.style.top = '0';
		video1.style.left = '81%';

		video2.style.position = 'absolute';
		video2.style.zIndex = '100000001';
		video2.style.height = '126px';
		video2.style.width = '270px';
		video2.style.top = '81%';
		video2.style.left = '81%';
	}
	const originVideo = () => {
		let video1 = document.querySelector('.jvCTkj').firstChild;
		let video2 = document.querySelector('.jvCTkj').lastChild;

		video1.style.position = 'absolute';
		video1.style.zIndex = '100000000';
		video1.style.height = '512px';
		video1.style.width = '1114px';
		video1.style.top = '10%';
		video1.style.left = '2.5%';

		video2.style.position = 'absolute';
		video2.style.zIndex = '100000001';
		video2.style.height = '159px';
		video2.style.width = '345px';
		video2.style.top = '10%';
		video2.style.left = '2.5%';
	}
	return (
		<React.Fragment>
			<div className="cafeContainer">
				<div className="sideBar">
					{video ? (
						<BsFillCameraVideoFill
							className="viedoOnIcon"
							onClick={handleVideo}
						/>
					) : (
						<FaVideoSlash className="viedoOffIcon" onClick={handleVideo} />
					)}
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

					{video && <Video meetingId={meetingId} />}
					{code && <div className="shamounCE"><TextEditor /></div>}
					{board && (
						<div className="shamounWB">
							<WhiteBoard />
						</div>
					)}

					<Chat meetingId={meetingId} />

					{ques &&
						state.user._id === table.owner && table.role === 'interviewer' ?

						(
							<div className="shamounQU">
								<Questions />
							</div>
						) : null}

					{ques &&
						state.user._id !== table.owner && table.role !== 'interviewer' ?
						(
							<div className="shamounQU">
								<Questions />
							</div>
						) : null}
				</div>

				<ToastContainer />
			</div>
		</React.Fragment>
	);
};

export default Cafe;
