'use strict';

const express = require('express');
const authRouter = express.Router();

const basicAuth = require('./middleware/basic.js');
const bearerAuth = require('./middleware/bearer.js');
const permissions = require('./middleware/acl.js');
// const googleOauth= require('./middleware/googleOauth');

const {
	signUpHandler,
	signInHandler,
	profileHandler,
	questionsHandler,
	googleOauthHandler
} = require('./authController/authController');

authRouter.post('/signup', signUpHandler);

authRouter.post('/signin', basicAuth, signInHandler);

authRouter.get('/profile/:id', bearerAuth, profileHandler);

authRouter.get('/questions/:id', bearerAuth, questionsHandler);

authRouter.post('/login' ,googleOauthHandler);

module.exports = authRouter;
