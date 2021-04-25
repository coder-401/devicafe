'use strict';

const collection = require('./../database/controller/data-collection');

const UserModel = require('./../database/models/user');
const userCollection = new collection(UserModel);

const updateProfile = async (req, res) => {
	let id = req.params.id;
	let body = req.body;
	const user = await userCollection.update(id, body);
	res.render('profile', { user });
};

const getProfile = async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await userCollection.get(id);
		res.render('profile', { user });
	} catch (e) {
		res.status(403).json({ error: e.message });
	}
};

module.exports = {
	updateProfile,
	getProfile,
};
