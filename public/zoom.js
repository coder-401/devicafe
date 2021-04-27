'use strict';

const socket = io('https://backenders-devecafe.herokuapp.com/');
const videoGrid = document.getElementById('video-grid');
const usersList = document.querySelector('.users');

var myPeer = new Peer(undefined, {
	port: '443',
});

let myVideoStream;
const myVideo = document.createElement('video');
myVideo.muted = true;
const peers = {};
navigator.mediaDevices
	.getUserMedia({
		video: true,
		audio: true,
	})
	.then((stream) => {
		myVideoStream = stream;

		myVideoStream.getAudioTracks()[0].enabled = false;
		myVideoStream.getVideoTracks()[0].enabled = false;

		addVideoStream(myVideo, stream);

		myPeer.on('call', (call) => {
			call.answer(stream);
			const video = document.createElement('video');
			call.on('stream', (userVideoStream) => {
				addVideoStream(video, userVideoStream);
			});
		});

		socket.on('user-connected', (userId) => {
			connectToNewUser(userId, stream);
		});

		let text = $('#chat_message');

		$('html').keydown(function (e) {
			if (e.which == 13 && text.val().length !== 0) {
				socket.emit('message', text.val(), username);
				text.val('');
			}
		});

		socket.on('createMessage', (message, username) => {
			$('.messages').append(
				`<li class="message"><b>${username}</b><br/>${message}</li>`,
			);
			scrollToBottom();
		});
	});

socket.on('user-disconnected', (userId) => {
	if (peers[userId]) peers[userId].close();
});

socket.on('roomUsers', (users) => {
	usersList.innerHTML = users
		.map((user) => `<li>Username: ${user}</li>`)
		.join('');
});

myPeer.on('open', (id) => {
	socket.emit('join-room', ROOM_ID, id, username);
});

function connectToNewUser(userId, stream) {
	const call = myPeer.call(userId, stream);
	const video = document.createElement('video');
	call.on('stream', (userVideoStream) => {
		addVideoStream(video, userVideoStream);
	});

	call.on('close', () => {
		video.remove();
	});

	peers[userId] = call;
}

function addVideoStream(video, stream) {
	video.srcObject = stream;
	video.addEventListener('loadedmetadata', () => {
		video.play();
	});
	videoGrid.append(video);
}

const scrollToBottom = () => {
	let d = $('.main__chat_window');
	d.scrollTop(d.prop('scrollHeight'));
};

const muteUnmute = () => {
	const enabled = myVideoStream.getAudioTracks()[0].enabled;
	if (enabled) {
		myVideoStream.getAudioTracks()[0].enabled = false;
		setUnmuteButton();
	} else {
		setMuteButton();
		myVideoStream.getAudioTracks()[0].enabled = true;
	}
};

const playStop = () => {
	let enabled = myVideoStream.getVideoTracks()[0].enabled;
	if (enabled) {
		console.log(myVideoStream);
		myVideoStream.getVideoTracks()[0].enabled = false;
		setPlayVideo();
	} else {
		myVideoStream.getVideoTracks()[0].enabled = true;
		setStopVideo();
	}
};

const setMuteButton = () => {
	const html = `
    <i class="fas fa-microphone"></i>
    <span>Mute</span>
  `;
	document.querySelector('.main__mute_button').innerHTML = html;
};

const setUnmuteButton = () => {
	const html = `
    <i class="unmute fas fa-microphone-slash"></i>
    <span>Unmute</span>
  `;
	document.querySelector('.main__mute_button').innerHTML = html;
};

const setStopVideo = () => {
	const html = `
    <i class="fas fa-video play"></i>
    <span>Stop Video</span>
  `;

	document.querySelector('.main__video_button').innerHTML = html;
};

const setPlayVideo = () => {
	const html = `
  <i class="stop fas fa-video-slash"></i>
    <span>Play Video</span>
  `;
	document.querySelector('.main__video_button').innerHTML = html;
};

/*-------------------------------Iframe_SandBox--------------------------------*/

let index;
const CCForm = document.querySelector('#CCForm');
const iframe = document.querySelector('#iframe');
if (iframe) {
	iframe.style.display = 'none';

	CCForm.addEventListener('submit', (eve) => {
		const btnbtn = document.querySelector('#btnbtn');
		btnbtn.style.display = 'block';
		eve.preventDefault();
		iframe.style.display = 'block';
		let radIdx = getRandom();
		let veiwFrame;
		let Type = eve.target.difficulty.value;
		if (Type === 'Easy') index = 0;
		if (Type === 'Meduim') index = 1;
		if (Type === 'Hard') index = 2;

		$.ajax('/codeChallenge.json').then((data) => {
			let iframeDetails = data[index].questions[radIdx];
			iframe.setAttribute('src', iframeDetails.src);
			iframe.setAttribute('title', iframeDetails.title);
			iframe.setAttribute('style', iframeDetails.style);
			iframe.setAttribute('allow', iframeDetails.allow);
			iframe.setAttribute('sandbox', iframeDetails.sandbox);
			veiwFrame = {
				src: iframeDetails.src,
				title: iframeDetails.title,
				style: iframeDetails.style,
				allow: iframeDetails.allow,
				sandbox: iframeDetails.sandbox,
			};
			socket.emit('showcodechallenge', veiwFrame);
		});
	});
}
socket.on('publiccode', (veiwFrame) => {
	const newFrame = document.createElement('iframe');
	newFrame.setAttribute('src', veiwFrame.src);
	newFrame.setAttribute('title', veiwFrame.title);
	newFrame.setAttribute('style', veiwFrame.style);
	newFrame.setAttribute('allow', veiwFrame.allow);
	newFrame.setAttribute('sandbox', veiwFrame.sandbox);

	$('section').append(newFrame);
});
function getRandom() {
	return Math.floor(Math.random() * (4 - 0) + 0);
}
