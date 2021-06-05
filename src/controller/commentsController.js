'use strict';

const collection = require('./../database/controller/data-collection');
const CommentModel = require('./../database/models/comments');
const commentCollection = new collection(CommentModel);

const getComments = async (req, res) => {
	try {
		const comments = await CommentModel.find({})
			.populate('owner', 'username _id')
			.exec();

		res.status(200).json(comments);
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
};

const createComment = async (req, res) => {
	try {
		const newComment = await commentCollection.create(req.body);

		const comment = await CommentModel.populate(newComment, { path: 'owner' });

		res.status(201).json(comment);
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
};

const deleteComment = async (req, res) => {
	try {
		const commentId = req.params.id;
		const comment = await commentCollection.delete(commentId);

		res.status(200).json(comment);
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
};

const editComment = async (req, res) => {
	try {
		const commentId = req.params.id;

		const comment = await CommentModel.findOneAndUpdate(
			{ _id: commentId },
			req.body,
			{
				new: true,
			},
		)
			.populate('owner', 'username _id')
			.exec();

		res.status(200).json(comment);
	} catch (err) {
		res.status(403).json({ error: err.message });
	}
};

module.exports = {
	getComments,
	createComment,
	deleteComment,
	editComment,
};
