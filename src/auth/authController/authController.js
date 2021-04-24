'use strict';

const User = require('./../../database/models/user');

const signUpHandler = async (req, res, next) => {
	try {
		let user = new User(req.body);
		const userRecord = await user.save();
		const output = {
			user: userRecord,
			token: userRecord.token,
		};

		// res.status(201).json(output);
		res.render(`/${user.user._id}`);
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

		// res.status(200).json(user);
		// res.redirect(`/${user.user._id}`);
		res.redirect(`/categories`);
	} catch (e) {
		res.status(403).json({ error: e.message });
	}
};

const profileHandler = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id);
		res.status(200).json(user);
	} catch (e) {
		res.status(403).json({ error: e.message });
	}
};

module.exports = {
	signUpHandler,
	signInHandler,
	profileHandler,
};
