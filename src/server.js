'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

//database

const Tables = require('./database/controller/data-collection');
const tablesModel = require('./database/models/table');
const tables = new Tables(tablesModel);

// Esoteric Resources
const errorHandler = require('./error-handler/500.js');
const notFound = require('./error-handler/404.js');
const authRoutes = require('./auth/authRouter');
const bearerAuth = require('./auth/middleware/bearer');

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

// Routes
app.use(authRoutes);

app.get('/', (req, res) => {
	res.render('login');
});

app.get('/categories', bearerAuth, (req, res) => {
	res.render('categories');
});

// app.get('/:room', bearerAuth, (req, res) => {
// 	res.render('home', { roomId: req.params.room });
// });

app.post('/signOut', (req, res) => {
	res.cookie('access_token', { maxAge: 0 });
	res.redirect('/');
});

app.post('/tables', async (req, res) => {
	const tablesObject = req.body;
	try {
		const resObj = await tables.create(tablesObject);
		res.status(201).json(resObj);
	} catch (error) {
		throw new Error(error.message);
	}
});

app.get('/tables', async (req, res, next) => {
	try {
		const resArr = await tables.get();

		res.render('tables', { resArr });
	} catch (error) {
		next(error);
	}
});

// Catchalls
app.use('*', notFound);
app.use(errorHandler);

io.on('connection', (socket) => {
	socket.on('join-room', (roomId, userId) => {
		socket.join(roomId);
		socket.broadcast.to(roomId).emit('user-connected', userId);

		socket.on('message', (message) => {
			io.to(roomId).emit('createMessage', message);
		});

		socket.on('disconnect', () => {
			socket.broadcast.to(roomId).emit('user-disconnected', userId);
		});
	});
});

module.exports = {
	server,
	start: (port) => {
		if (!port) {
			throw new Error('Missing Port');
		}
		server.listen(port, () => console.log(`Listening on ${port}`));
	},
};
