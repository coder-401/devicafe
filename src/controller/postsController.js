'use strict';

const collection = require('./../database/controller/data-collection');

const PostModel = require('./../database/models/posts');
const postCollection = new collection(PostModel);

const getPosts = async (req, res) => {
	try {
		const posts = await PostModel.find({})
			.populate('owner', 'username _id')
			.exec();

		res.status(200).json(posts);
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
};

const createPost = async (req, res) => {
	try {
		const newPost = await postCollection.create(req.body);

		const post = await PostModel.populate(newPost, { path: 'owner' });

		res.status(201).json(post);
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
};

const deletePost = async (req, res) => {
	try {
		const postId = req.params.id;
		const post = await postCollection.delete(postId);

		res.status(200).json(post);
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
};

const editPost = async (req, res) => {
	try {
		const postId = req.params.id;
		const post = await PostModel.findOneAndUpdate({ _id: postId }, req.body, {
			new: true,
		})
			.populate('owner', 'username _id')
			.exec();

		res.status(200).json(post);
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
};

module.exports = {
	getPosts,
	createPost,
	deletePost,
	editPost,
};
