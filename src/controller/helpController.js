'use strict';

const collection = require('./../database/controller/data-collection');

const PostModel = require('./../database/models/posts');
const postCollection = new collection(PostModel);

const CommentModel = require('./../database/models/comments');
const commentCollection = new collection(CommentModel);

const moment = require('moment');

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

const createPost = async (req, res) => {
	try {
		const userId = req.params.id;
		const newPost = req.body;
		await postCollection.create(newPost);

		res.redirect(`/help/${userId}`);
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
};

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

module.exports = {
	getPosts,
	createPost,
	createComment,
};
