import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import styled from 'styled-components';

const socket = io.connect('http://localhost:5000');

const Video = styled.video`
	border: 1px solid blue;
	width: 50%;
	height: 50%;
`;

const VideoCall = () => {
	const [yourID, setYourID] = useState('');
	const [users, setUsers] = useState([]);
	const [stream, setStream] = useState();
	const [receivingCall, setReceivingCall] = useState(false);
	const [caller, setCaller] = useState('');
	const [callerSignal, setCallerSignal] = useState();
	const [callAccepted, setCallAccepted] = useState(false);
	const [username, setUsername] = useState('');

	const userVideo = useRef();
	const partnerVideo = useRef();

	const state = useSelector((state) => {
		return {
			token: state.signIn.token,
			user: state.signIn.user,
		};
	});

	socket.emit('username', state.user.username);

	socket.on('username', (username) => {
		setUsername(username);
	});

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				setStream(stream);
				if (userVideo.current) {
					userVideo.current.srcObject = stream;
				}
			});

		socket.on('yourID', (id) => {
			setYourID(id);
		});

		socket.on('allUsers', (users) => {
			setUsers(users);
		});

		socket.on('hey', (data) => {
			setReceivingCall(true);
			setCaller(data.from);
			setCallerSignal(data.signal);
		});
	}, []);

	function callPeer(id) {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream,
		});

		peer.on('signal', (data) => {
			socket.emit('callUser', {
				userToCall: id,
				signalData: data,
				from: yourID,
			});
		});

		peer.on('stream', (stream) => {
			if (partnerVideo.current) {
				partnerVideo.current.srcObject = stream;
			}
		});

		socket.on('callAccepted', (signal) => {
			setCallAccepted(true);
			peer.signal(signal);
		});
	}

	function acceptCall() {
		setCallAccepted(true);
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream,
		});
		peer.on('signal', (data) => {
			socket.emit('acceptCall', { signal: data, to: caller });
		});

		peer.on('stream', (stream) => {
			partnerVideo.current.srcObject = stream;
		});

		peer.signal(callerSignal);
	}

	let UserVideo;
	if (stream) {
		UserVideo = <Video playsInline muted ref={userVideo} autoPlay />;
	}

	let PartnerVideo;
	if (callAccepted) {
		PartnerVideo = <Video playsInline ref={partnerVideo} autoPlay />;
	}

	let incomingCall;
	if (receivingCall) {
		incomingCall = (
			<div>
				<h1>{caller} is calling you</h1>
				<button onClick={acceptCall}>Accept</button>
			</div>
		);
	}

	return (
		<React.Fragment>
			<div>
				{UserVideo}
				{PartnerVideo}
			</div>
			<div>
				{users.map((key) => {
					if (key === yourID) {
						return null;
					}
					return (
						<button key={key} onClick={() => callPeer(key)}>
							Call {username}
							{key}
						</button>
					);
				})}
			</div>
			<div>{incomingCall}</div>
		</React.Fragment>
	);
};

export default VideoCall;
