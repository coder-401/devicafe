'use strict';

const collection = require('./../database/controller/data-collection');
const UserModel = require('./../database/models/user');
const userCollection = new collection(UserModel);

const getProfile = async (req, res) => {
	try {
		const id = req.params.id;
		const user = await userCollection.get(id);

		res.status(200).json(user);
	} catch (e) {
		res.status(403).json({ error: e.message });
	}
};

const updateProfile = async (req, res) => {
	try {
		const id = req.params.id;
		const record = req.body;
		const user = await userCollection.update(id, record);

		res.status(200).json(user);
	} catch (error) {
		res.status(403).json({ error: e.message });
	}
};

module.exports = {
	getProfile,
	updateProfile,
};
