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
	googleOauthHandler,
	signOutHandler,
} = require('./authController/authController');

authRouter.get('/', (req, res) => {
	res.render('login');
});

authRouter.post('/signin', basicAuth, signInHandler);
authRouter.post('/signup', signUpHandler);
authRouter.post('/signOut', signOutHandler);

authRouter.post('/login' ,googleOauthHandler);

module.exports = authRouter;
