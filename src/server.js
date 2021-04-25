'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const moment = require('moment');

const questions = JSON.parse(fs.readFileSync('questions.json').toString());
// console.log('************0',questions);

//database

const collection = require('./database/controller/data-collection');

const UserModel = require('./database/models/user');
const userCollection = new collection(UserModel);

const tablesModel = require('./database/models/table');
const tables = new collection(tablesModel);

const PostModel = require('./database/models/posts');
const postCollection = new collection(PostModel);

const CommentModel = require('./database/models/comments');
const commentCollection = new collection(CommentModel);

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

// signIn signOut signUp routes
app.use(authRoutes);

app.get('/', (req, res) => {
	res.render('login');
});

app.post('/signOut', (req, res) => {
	res.cookie('access_token', { maxAge: 0 });
	res.redirect('/');
});

app.get('/categories/:id', bearerAuth, (req, res) => {
	const userId = req.params.id;
	res.render('categories', { userId });
});

// profile routes
app.put('/profile/:id', async (req, res) => {
	let id = req.params.id;
	let body = req.body;
	const user = await userCollection.update(id, body);
	res.render('profile', { user });
});

// help desk routes
app.get('/help/:id', async (req, res) => {
	try {
		const userId = req.params.id;
		const posts = await postCollection.get();

		const comments = await CommentModel.find()
			.populate('post', 'time description')
			.select('time description post');

		if (comments) res.render('postAndComment', { userId, posts, comments });
		else res.render('postAndComment', { userId, posts });
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
});

//add post routes
app.post('/post/:id', async (req, res) => {
	try {
		const userId = req.params.id;
		const newPost = req.body;
		await postCollection.create(newPost);

		res.redirect(`/help/${userId}`);
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
});

//add comment routes
app.post('/comment/:id', async (req, res) => {
	try {
		let time = moment().format('h:mm a');
		const userId = req.params.id;
		const newComment = {
			description: req.body.description,
			owner: req.body.owner,
			post: req.body.post,
			time,
		};
		await commentCollection.create(newComment);

		res.redirect(`/help/${userId}`);
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
});

// app.get('/:room', bearerAuth, (req, res) => {
// 	res.render('home', { roomId: req.params.room });
// });

// app.post('/tables', async (req, res) => {
// 	const tablesObject = req.body;
// 	try {
// 		const resObj = await tables.create(tablesObject);
// 		res.status(201).json(resObj);
// 	} catch (error) {
// 		throw new Error(error.message);
// 	}
// });

// app.get('/tables', async (req, res, next) => {
// 	try {
// 		const resArr = await tables.get();
// 		res.render('tables', { resArr });
// 	} catch (error) {
// 		next(error);
// 	}
// });

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
