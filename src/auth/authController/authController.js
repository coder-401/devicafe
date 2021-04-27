'use strict';

const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const User = require('./../../database/models/user');
const collection = require('./../../database/controller/data-collection');
const userCollection = new collection(User);

const signUpHandler = async (req, res) => {
	try {
		let user = await User.find({ username: req.body.username });
		if (user.length === 0) {

		await userCollection.create(req.body);
		}
		res.redirect('/');
	} catch (e) {
		res.status(403).json({ error: e.message });
	}
};

const getSignUpHandler = (req, res) => {
	res.render('signUp');
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

const googleOauthHandler = async (req, res) => {
	let token = req.body.token;

	res.cookie('access_token', token, {
		maxAge: 360000000,
		httpOnly: true,
	});

	const client = new OAuth2Client(process.env.ClientIDGoogle);

	async function verify() {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.ClientIDGoogle,
		});
		const payload = ticket.getPayload();
		const password = payload['sub'];
		let username = payload['email'].split('@')[0];
		let email = payload['email'];
		let role = 'user';

		let user = {
			username: username,
			email: email,
			role: role,
			password: password,
		};

		const inDB = await User.find({ username: username });

		if (!inDB.length) {
			let newUser = new User(user);
			const userRecord = await newUser.save();
			res.redirect(`/categories/${userRecord._id}`);
		} else {
			res.redirect(`/categories/${inDB[0]._id}`);
		}
	}

	verify().catch(console.error());
};

module.exports = {
	signUpHandler,
	getSignUpHandler,
	signInHandler,
	signOutHandler,
	googleOauthHandler,
};
