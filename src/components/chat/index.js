import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

const Chat = ({ meetingId }) => {
	const [message, setMessage] = useState('');
	const [messageList, setMessageList] = useState([]);

	const state = useSelector((state) => {
		return {
			token: state.signIn.token,
			user: state.signIn.user,
			questions: state.questions.questions,
		};
	});

	useEffect(() => {
		socket.emit('join_room', meetingId);
	}, []);

	useEffect(() => {
		socket.on('receive_message', (data) => {
			setMessageList([...messageList, data]);
		});
	});

	const sendMessage = async () => {
		let messageContent = {
			room: meetingId,
			content: {
				author: state.user.username,
				message: message,
			},
		};

		await socket.emit('send_message', messageContent);
		setMessageList([...messageList, messageContent.content]);
		setMessage('');
	};

	return (
		<div className="App">
			<div className="chatContainer">
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

				<div className="messageInputs">
					<input
						type="text"
						placeholder="Message..."
						onChange={(e) => {
							setMessage(e.target.value);
						}}
					/>
					<button onClick={sendMessage}>Send</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
