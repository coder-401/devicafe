'use strict';

const express = require('express');
const router = express.Router();

const {
	getComments,
	createComment,
	deleteComment,
	editComment,
} = require('./../controller/commentsController');

const bearerAuth = require('./../auth/middleware/bearer');

//add comment routes
router.get('/comments', bearerAuth, getComments);
router.post('/comment', bearerAuth, createComment);
router.delete('/comment/:id', bearerAuth, deleteComment);
router.put('/comment/:id', bearerAuth, editComment);

module.exports = router;
