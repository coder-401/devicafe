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
let postOwner;
let commentOwner;
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

	/*------------------------------Post_Part---------------------------------*/
	let userPostRecord;
	socket.on('post', (userPost, userId) => {
		savePostInDB(userPost, userId).then((data) => {
			userPostRecord = data;
			console.log('post', userPostRecord);

			io.emit('postpublic', userPostRecord, postOwner);
		});
	});
	/*---------------------------------Comment_Part-----------------------------*/
	let userCommentRecord;
	socket.on('comment', (comment, postId, userId) => {
		saveCommentInDB(comment, postId, userId).then((data) => {
			userCommentRecord = data;
			// console.log("comment", userCommentRecord);
			io.emit('commentpublic', userCommentRecord, commentOwner);
		});
	});
});
/*---------------------------Save Post in DataBase-------------------------*/

async function savePostInDB(userPost, userId) {
	const Posts = require('./database/models/posts');
	const Users = require('./database/models/user');

	const user = await Users.find({ _id: userId });
	postOwner = user[0].username;
	console.log('__POST_OWNER__', postOwner);

	let post = new Posts({
		description: userPost,
		owner: user[0],
	});

	const userPostRecord = await post.save();
	console.log('Saved POST In DataBase', userPostRecord);
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
	console.log('__COMMENT_OWNER__', commentOwner);

	let comment = new Comment({
		description: userComment,
		post: postId,
		owner: userId,
	});

	const userCommentRecord = await comment.save();
	console.log('Saved Comment In DataBase', userCommentRecord);
	return userCommentRecord;
}
/*--------------------------------------------------------------------------------*/

module.exports = {
	server,
	start: (port) => {
		if (!port) {
			throw new Error('Missing Port');
		}
		server.listen(port, () => console.log(`Listening on ${port}`));
	},
};
