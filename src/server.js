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
		methods: ['GET', 'POST'],
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
io.on('connection', (socket) => {
	socket.emit('me', socket.id);

	socket.on('disconnect', () => {
		socket.broadcast.emit('callEnded');
	});

	socket.on('callUser', (data) => {
		io.to(data.userToCall).emit('callUser', {
			signal: data.signalData,
			from: data.from,
			name: data.name,
		});
	});

	socket.on('answerCall', (data) => {
		io.to(data.to).emit('callAccepted', data.signal);
	});

	/*------------------------------whiteBoard---------------------------------*/
	let drawing = false;
	let strokeStyle = 'black';
	let lineWidth = 10;
	socket.on('mousedown', (x, y, _strokeStyle, _lineWidth) => {
		drawing = true;
		strokeStyle = _strokeStyle;
		lineWidth = _lineWidth;
		io.emit('_mousedown', drawing, x, y, strokeStyle, lineWidth);
	});
	socket.on('mouseup', () => {
		drawing = false;
		io.emit('_mouseup', drawing);
	});
	socket.on('mousemove', (x, y) => {
		if (drawing) {
			io.emit('_mousemove', x, y);
		}
	});

	/*--------------------------Code_Challenge_Part-----------------------------*/
	socket.on('showcodechallenge', (veiwFrame) => {
		socket.broadcast.emit('publiccode', veiwFrame);
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
