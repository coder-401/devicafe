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
const user = require('./database/models/user');

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
let postOwner;
let commentOwner;
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

	/*------------------------------Post_Part---------------------------------*/
	let userPostRecord;
	socket.on('post', (userPost, userId) => {
		savePostInDB(userPost, userId).then((data) => {
			userPostRecord = data;
			io.emit('postpublic', userPostRecord, postOwner);
		});
	});
	/*---------------------------------Comment_Part-----------------------------*/
	let userCommentRecord;
	socket.on('comment', (comment, postId, userId) => {
		saveCommentInDB(comment, postId, userId).then((data) => {
			userCommentRecord = data;
			io.emit('commentpublic', userCommentRecord, commentOwner);
		});
	});
	/*--------------------------Code_Challenge_Part-----------------------------*/
	socket.on('showcodechallenge', (veiwFrame) => {
		socket.broadcast.emit('publiccode', veiwFrame);
	});
});
/*---------------------------Save Post in DataBase-------------------------*/

async function savePostInDB(userPost, userId) {
	const Posts = require('./database/models/posts');
	const Users = require('./database/models/user');

	const user = await Users.find({ _id: userId });
	postOwner = user[0].username;

	let post = new Posts({
		description: userPost,
		owner: user[0],
	});

	const userPostRecord = await post.save();
	// const any = await Posts.find({}).populate('comments').select('description owner -_id')
	// console.log(any,"ANY++++++++++++++++++++")
	return userPostRecord;
}
/*---------------------------Save Comment in DataBase-------------------------*/
async function saveCommentInDB(userComment, postId, userId) {
	const Comment = require('./database/models/comments');
	const Users = require('./database/models/user');

	const user = await Users.find({ _id: userId });
	commentOwner = user[0].username;

	let comment = new Comment({
		description: userComment,
		post: postId,
		owner: userId,
	});

	const userCommentRecord = await comment.save();
	return userCommentRecord;
}

/*----------------------------------------------------------------------------------*/

module.exports = {
	server,
	start: (port) => {
		if (!port) {
			throw new Error('Missing Port');
		}
		server.listen(port, () => console.log(`Listening on ${port}`));
	},
};
