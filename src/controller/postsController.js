'use strict';

const collection = require('./../database/controller/data-collection');

const PostModel = require('./../database/models/posts');
const postCollection = new collection(PostModel);

const getPosts = async (req, res) => {
	try {
		const posts = await postCollection.get();

		res.status(200).json(posts);
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
};

const createPost = async (req, res) => {
	try {
		const post = await postCollection.create(req.body);
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
		const post = await postCollection.update(postId, req.body);

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
