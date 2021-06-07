'use strict';

// 3rd Party Resources
const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');

// Prepare the express app
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	},
});

//routers
const authRouter = require('./auth/authRouter');
const profileRouter = require('./routes/profileRoute');
const tableRouter = require('./routes/tableRoute');
const commentsRouter = require('./routes/commentsRoute');
const postsRouter = require('./routes/postsRoute');
const questionsRoutes = require('./routes/questionsRoute');
const errorHandler = require('./error-handler/500.js');
const notFound = require('./error-handler/404.js');

//Built-in MW
app.use(express.json());

// Third Party MW
app.use(cors());
app.use(morgan('dev'));

// App Level MW
app.use(authRouter);
app.use(profileRouter);
app.use(tableRouter);
app.use(postsRouter);
app.use(commentsRouter);
app.use(questionsRoutes);

app.use('*', notFound);
app.use(errorHandler);

//socket connections
const users = {};
const socketToRoom = {};
io.on('connection', (socket) => {
	/* ------------------------------Video--------------------------------- */

	socket.on('join room', (roomID) => {
		if (users[roomID]) {
			const length = users[roomID].length;
			if (length === 4) {
				socket.emit('room full');
				return;
			}
			users[roomID].push(socket.id);
		} else {
			users[roomID] = [socket.id];
		}
		socketToRoom[socket.id] = roomID;
		const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

		socket.emit('all users', usersInThisRoom);
	});

	socket.on('sending signal', (payload) => {
		io.to(payload.userToSignal).emit('user joined', {
			signal: payload.signal,
			callerID: payload.callerID,
		});
	});

	socket.on('returning signal', (payload) => {
		io.to(payload.callerID).emit('receiving returned signal', {
			signal: payload.signal,
			id: socket.id,
		});
	});

	socket.on('disconnect', () => {
		const roomID = socketToRoom[socket.id];
		let room = users[roomID];
		if (room) {
			room = room.filter((id) => id !== socket.id);
			users[roomID] = room;
		}
	});
	/*------------------------------Chat---------------------------------*/

	socket.on('join_room', (data) => {
		socket.join(data);
	});

	socket.on('send_message', (data) => {
		socket.to(data.room).emit('receive_message', data.content);
	});

	/*------------------------------whiteBoard---------------------------------*/
	socket.on('canvas-data', (data) => {
		socket.broadcast.emit('canvas-data', data);
	});

	/*--------------------------Code_Challenge_Part-----------------------------*/
	socket.on('codeText', (code) => {
		socket.broadcast.emit('code-update', code);
	});

	socket.on('themeChange', (theme) => {
		io.emit('theme-update', theme);
	});

	socket.on('languageChange', (language) => {
		io.emit('language-update', language);
	});
});

module.exports = {
	start: (port) => {
		if (!port) {
			throw new Error('Missing Port');
		}
		server.listen(port, () => console.log(`Listening on ${port}`));
	},
};
