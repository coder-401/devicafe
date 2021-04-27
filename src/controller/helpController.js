'use strict';

const collection = require('./../database/controller/data-collection');

const PostModel = require('./../database/models/posts');
const postCollection = new collection(PostModel);

const CommentModel = require('./../database/models/comments');
const commentCollection = new collection(CommentModel);

const UserModel = require('./../database/models/user');
const userCollection = new collection(UserModel);

const moment = require('moment');

//_________________GET ALL POSTS & COMMENTS____________________

const getPosts = async (req, res) => {
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
};
//_________________CREATE POSTS____________________

const createPost = async (req, res) => {
	try {
		let time = moment().format('h:mm a');

		const userId = req.params.id;
		const newPost = {
			description: req.body.description,
			owner: req.body.owner,
			time,
		};
		await postCollection.create(newPost);

		res.redirect(`/help/${userId}`);
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
};

//_________________DELETE POSTS____________________

const deletePost = async (req, res) => {
	try {
		const userId = req.params.id;
		const postID = req.params.postId;
		const postOwner = await postCollection.get(postID);

		// console.log(postOwner.owner, "THE POST OWNER")
		// console.log(userId, "HOW WAN TO DELETE THE POST")

		if (userId === postOwner.owner.toString()) {
			await postCollection.delete(postID);
			res.redirect(`/help/${userId}`);
		} else {
			res.json({
				message: "You Can't Delete It",
			});
		}
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
};

//_________________EDIT POSTS____________________

const editPost = async (req, res) => {
	try {
		const userId = req.params.id;
		const postID = req.params.postId;
		const postOwner = await postCollection.get(postID);
		const record = req.body;

		// console.log(record, "THE__RECORD____")
		// console.log(typeof postOwner.owner, "THE POST OWNER");
		// console.log(typeof userId, "HOW WANT TO EDIT THE POST");

		if (userId === postOwner.owner.toString()) {
			await postCollection.update(postID, record);
			res.redirect(`/help/${userId}`);
		} else {
			res.json({
				message: 'You Are Not Allow To Edit',
			});
		}
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
};

//_________________CREATE COMMENTS____________________

const createComment = async (req, res) => {
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
};

//_________________DELETE COMMENTS____________________

const deleteComment = async (req, res) => {
	try {
		const userId = req.params.id;
		const commentId = req.params.commentId;
		const commentOwner = await commentCollection.get(commentId);

		// console.log(commentOwner.owner, "THE COMMENT OWNER")
		// console.log(userId, "HOW WAN TO DELETE THE COMMENT")

		if (userId === commentOwner.owner.toString()) {
			await commentCollection.delete(commentId);
			res.redirect(`/help/${userId}`);
		} else {
			res.json({
				message: "You Can't Delete It",
			});
		}
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
};
//_________________EDIT COMMENTS____________________

const editComment = async (req, res) => {
	try {
		const userId = req.params.id;
		const commentId = req.params.commentId;
		const commentOwner = await commentCollection.get(commentId);
		const record = req.body;

		// console.log(record, "THE__RECORD____")
		// console.log(commentOwner, "THE COMMENT OWNER");
		// console.log(typeof userId, "HOW WANT TO EDIT THE COMMENT");

		if (userId === commentOwner.owner.toString()) {
			await commentCollection.update(commentId, record);
			res.redirect(`/help/${userId}`);
		} else {
			res.json({
				message: 'You Are Not Allow To Edit',
			});
		}
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
};
module.exports = {
	getPosts,
	createPost,
	createComment,
	deletePost,
	deleteComment,
	editPost,
	editComment,
};
