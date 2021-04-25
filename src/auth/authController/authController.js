'use strict';

const User = require('./../../database/models/user');
const collection = require('./../../database/controller/data-collection');
const userCollection = new collection(User);

const signUpHandler = async (req, res) => {
	try {
		await userCollection.create(req.body);

		res.render('login');
	} catch (e) {
		res.status(403).json({ error: e.message });
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

		res.redirect(`categories/${user.user._id}`);
	} catch (e) {
		res.status(403).json({ error: e.message });
	}
};

const signOutHandler = (req, res) => {
	res.cookie('access_token', { maxAge: 0 });
	res.redirect('/');
};

module.exports = {
	signUpHandler,
	signInHandler,
	signOutHandler,
};
