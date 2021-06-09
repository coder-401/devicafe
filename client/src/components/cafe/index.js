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
import { CopyToClipboard } from 'react-copy-to-clipboard'


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

	return (
		<React.Fragment>
			<div className="cafeContainer">

				<div className="sideBar">
					<h4>username role.......</h4>
					<Button>Questions</Button>
					<Button>WhiteBoard</Button>
					<Button>Code Editor</Button>
					<CopyToClipboard text={meetingId}>
						<span style={{ padding: "2%", border: "1px solid", background: "#eee", borderRadius: "5px", cursor: "pointer" }}>Copy to clipboard table Id</span>
					</CopyToClipboard>
				</div>


				<div className="leftSide">

					{/* {start ? <BsFillCameraVideoFill className="viedoOnIcon" onClick={handleCall} /> : <FaVideoSlash className="viedoOffIcon" onClick={handleCall} />}
					{start && <Video meetingId={meetingId} />} */}


					<TextEditor />

					{/* <div className="shamounWB">
						<WhiteBoard />
					</div> */}

					<Chat meetingId={meetingId} />

					{/* <div className="shamounQU">
						<Questions />
					</div> */}

				</div>




				{/* 
			<button onClick={handleBoard}>
				{!show ? `open whiteBoard` : `close whiteBoard`}
			</button>

			{state.user._id === table.owner && table.role === 'interviewer' ? (
				<div>
				</div>
			) : (
				<div></div>
			)}

			{state.user._id !== table.owner && table.role !== 'interviewer' ? (
				<Questions />
			) : (
				<div></div>
			)} */}



				<ToastContainer />
			</div>
		</React.Fragment>
	);
};

export default Cafe;