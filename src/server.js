'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

//routers
const authRoutes = require('./auth/authRouter');
const categoriesRoutes = require('./routes/categoriesRoute');
const profileRoutes = require('./routes/profileRoute');
const helpRoutes = require('./routes/helpRoute');
const questionsRoutes = require('./routes/questionsRoute');
const cafeRoutes = require('./routes/cafeRoutes');

const errorHandler = require('./error-handler/500.js');
const notFound = require('./error-handler/404.js');

// Prepare the express app
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// App Level MW
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Routes
app.use(authRoutes);
app.use(categoriesRoutes);
app.use(profileRoutes);
app.use(helpRoutes);
app.use(questionsRoutes);
app.use(cafeRoutes);

app.use('*', notFound);
app.use(errorHandler);

//socket connections
let users = [];

io.on('connection', (socket) => {
	socket.on('join-room', (roomId, userId, username) => {
		socket.join(roomId);
		socket.to(roomId).emit('user-connected', userId);

		socket.on('message', (message, username) => {
			const index = users.indexOf(username);
			io.to(roomId).emit('createMessage', message, users[index]);
		});

		if (!users.includes(username)) users.push(username);
		io.to(roomId).emit('roomUsers', users);

		socket.on('disconnect', () => {
			const index = users.indexOf(username);
			users.splice(index, 1);
			socket.broadcast.to(roomId).emit('user-disconnected', userId);
			io.to(roomId).emit('roomUsers', users);
		});
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
