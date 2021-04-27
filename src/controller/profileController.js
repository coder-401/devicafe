'use strict';

const collection = require('./../database/controller/data-collection');

const UserModel = require('./../database/models/user');
const FavQesModel = require('./../database/models/favQuestion');

const favQuesCollection = new collection(FavQesModel);

const userCollection = new collection(UserModel);
let favQ;
const updateProfile = async (req, res) => {
	let id = req.params.id;
	let body = req.body;
	const user = await userCollection.update(id, body);
	if(favQ){
		res.render('profile', { user ,favQ});
	}
	res.render('profile', { user });
};

const getProfile = async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await userCollection.get(id);

		 favQ = await FavQesModel.find().populate("owner").select("question answer");
		
		res.render('profile', { user,favQ });
	} catch (e) {
		res.status(403).json({ error: e.message });
	}
};

module.exports = {
	updateProfile,
	getProfile,
};
