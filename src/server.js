'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const questions = JSON.parse(fs.readFileSync('questions.json').toString());
// console.log('************0',questions);

//database

const collection = require('./database/controller/data-collection');

const UserModel = require('./database/models/user');
const userCollection = new collection(UserModel);

const tablesModel = require('./database/models/table');
const tables = new collection(tablesModel);

// Esoteric Resources
const errorHandler = require('./error-handler/500.js');
const notFound = require('./error-handler/404.js');
const authRoutes = require('./auth/authRouter');
const bearerAuth = require('./auth/middleware/bearer');

// Prepare the express app
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const methodOverride = require('method-override');

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

app.get('/', (req, res) => {
	res.render('login');
});

app.get('/categories/:id', bearerAuth, (req, res) => {
	const userId = req.params.id;
	res.render('categories', { userId });
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

app.get('/profile', async (req, res) => {
	//where id ?
	const id = req.cookies.user.user._id;
	const user = await userCollection.get(id);
	res.render('profile', { user });
});

app.put('/profile/:id', async (req, res) => {
	let id = req.params.id;
	let body = req.body;
	const user = await userCollection.update(id, body);
	res.render('profile', { user });
});

app.get('/help', async (req, res) => {
	try {
		const Posts = require('./database/models/posts');
		const Comment = require('./database/models/comments');
		const Users = require('./database/models/user');

		// const posts = await Posts.find({});
		// const comments = await Comment.find({});
		const users = await Users.find({});

		res.render('postAndComment', {
			// PostsArr : posts,
			// CommentsArr : comments,
			UsersArr: users,
		});
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
});

// Catchalls
app.use('*', notFound);
app.use(errorHandler);

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
	questions,
	server,
	start: (port) => {
		if (!port) {
			throw new Error('Missing Port');
		}
		server.listen(port, () => console.log(`Listening on ${port}`));
	},
};
