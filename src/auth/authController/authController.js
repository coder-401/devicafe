'use strict';

require('dotenv').config();

const User = require('./../../database/models/user');
const collection = require('./../../database/controller/data-collection');
const userCollection = new collection(User);

const signUpHandler = async (req, res) => {
	try {
		const response = await userCollection.create(req.body);
		res.status(201).json(response);
	} catch (e) {
		res.status(400).json(e.message);
	}
};

const signInHandler = (req, res) => {
	try {
		const user = {
			user: req.user,
			token: req.user.token,
		};

		res.cookie('access_token', user.token, {
			maxAge: 360000000,
			httpOnly: true,
		});
		res.status(200).json(user);
	} catch (e) {
		res.status(403).json({ error: e.message });
	}
};

module.exports = {
	signUpHandler,
	signInHandler,
};
