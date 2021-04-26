'use strict';

const express = require('express');
const authRouter = express.Router();

const basicAuth = require('./middleware/basic.js');
const permissions = require('./middleware/acl.js');

const {
	signUpHandler,
	signInHandler,
	googleOauthHandler,
	signOutHandler,
} = require('./authController/authController');

authRouter.get('/', (req, res) => {
	res.render('login');
});

authRouter.post('/signin', basicAuth, signInHandler);
authRouter.post('/signup', signUpHandler);
authRouter.post('/signOut', signOutHandler);

authRouter.post('/login', googleOauthHandler);

module.exports = authRouter;
