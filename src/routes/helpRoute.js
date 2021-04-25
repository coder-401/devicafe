'use strict';

const express = require('express');
const router = express.Router();

const {
	getPosts,
	createPost,
	createComment,
} = require('./../controller/helpController');

const bearerAuth = require('./../auth/middleware/bearer');

// help desk routes
router.get('/help/:id', bearerAuth, getPosts);

//add post routes
router.post('/post/:id', bearerAuth, createPost);

//add comment routes
router.post('/comment/:id', bearerAuth, createComment);

module.exports = router;
