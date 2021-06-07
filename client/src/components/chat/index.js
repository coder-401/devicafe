import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { SiMessenger } from 'react-icons/si';
import { RiSendPlane2Fill } from 'react-icons/ri';
import './chat.css';

const socket = io.connect('http://localhost:5000');

const Chat = ({ meetingId }) => {
	const [messageList, setMessageList] = useState([]);
	const [show, setShow] = useState(false);

	const state = useSelector((state) => {
		return {
			token: state.signIn.token,
			user: state.signIn.user,
			questions: state.questions.questions,
		};
	});

	useEffect(() => {
		socket.emit('join room', meetingId);
	}, []);

	useEffect(() => {
		socket.on('receive_message', (data) => {
			setMessageList([...messageList, data]);
		});
	});

	const sendMessage = async (e) => {
		e.preventDefault();
		let messageContent = {
			room: meetingId,
			content: {
				author: state.user.username,
				message: e.target.message.value,
			},
		};

		await socket.emit('send_message', messageContent);
		setMessageList([...messageList, messageContent.content]);

		e.target.message.value = '';
		e.target.message.focus();
	};

	const handleClick = () => {
		setShow(!show);
	};

	return (
		<div className="chatContainer">
			{show && (
				<div className="Chat">
					<div className="messages">
						{messageList.map((val, key) => {
							return (
								<div key={key}>
									<div className="messageIndividual">
										{val.author}: {val.message}
									</div>
								</div>
							);
						})}
					</div>
					<form className="messageInputs" onSubmit={sendMessage}>
						<input name="message" type="text" placeholder="Message..." />
						<button>
							<RiSendPlane2Fill />
						</button>
					</form>
				</div>
			)}
			<SiMessenger
				style={{ fontSize: '2rem', cursor: 'pointer' }}
				onClick={handleClick}
			/>
		</div>
	);
};

export default Chat;
