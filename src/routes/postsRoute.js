'use strict';

const express = require('express');
const router = express.Router();

const {
	getPosts,
	createPost,
	deletePost,
	editPost,
} = require('../controller/postsController');

const bearerAuth = require('../auth/middleware/bearer');

//add post routes
router.get('/posts', getPosts);
router.post('/post', bearerAuth, createPost);
router.delete('/post/:id', bearerAuth, deletePost);
router.put('/post/:id', bearerAuth, editPost);

module.exports = router;
