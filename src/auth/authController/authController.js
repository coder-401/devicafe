'use strict';

const User = require('./../../database/models/user');

const collection = require('./../../database/controller/data-collection');

const userCollection = new collection(User);

const signUpHandler = async (req, res, next) => {
	try {
		let user = new User(req.body);
		const userRecord = await user.save();
		const output = {
			user: userRecord,
			token: userRecord.token,
		};

		// res.status(201).json(output);
		res.render(`/`);
	} catch (e) {
		res.status(403).json({ error: e.message });
	}
};

const signInHandler = (req, res, next) => {
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

const profileHandler = async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await userCollection.get(id);
		res.render('profile', { user });
	} catch (e) {
		res.status(403).json({ error: e.message });
	}
};

module.exports = {
	signUpHandler,
	signInHandler,
	profileHandler,
};
