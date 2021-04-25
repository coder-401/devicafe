'use strict';

const express = require('express');
const authRouter = express.Router();

const basicAuth = require('./middleware/basic.js');
const bearerAuth = require('./middleware/bearer.js');
const permissions = require('./middleware/acl.js');

const {
	signUpHandler,
	signInHandler,
	profileHandler,
	questionsHandler
} = require('./authController/authController');

authRouter.post('/signup', signUpHandler);

authRouter.post('/signin', basicAuth, signInHandler);

authRouter.get('/profile/:id', bearerAuth, profileHandler);

authRouter.get('/questions/:id', bearerAuth, questionsHandler);

module.exports = authRouter;
