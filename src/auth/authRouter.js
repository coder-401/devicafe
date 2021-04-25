'use strict';

const express = require('express');
const authRouter = express.Router();

const basicAuth = require('./middleware/basic.js');

const {
	signUpHandler,
	signInHandler,
	signOutHandler,
} = require('./authController/authController');

authRouter.get('/', (req, res) => {
	res.render('login');
});

authRouter.post('/signin', basicAuth, signInHandler);
authRouter.post('/signup', signUpHandler);
authRouter.post('/signOut', signOutHandler);

module.exports = authRouter;
