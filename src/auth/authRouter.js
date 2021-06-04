'use strict';

const express = require('express');
const authRouter = express.Router();

const basicAuth = require('./middleware/basic.js');

const {
	signUpHandler,
	signInHandler,
} = require('./authController/authController');

authRouter.post('/login', basicAuth, signInHandler);
authRouter.post('/register', signUpHandler);

module.exports = authRouter;
