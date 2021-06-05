'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

let Users = new Schema({
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: {
		type: String,
		required: true,
		default: 'user',
		enum: ['user', 'editor', 'admin'],
	},
});

Users.virtual('token').get(function () {
	let tokenObject = {
		_id: this._id,
		username: this.username,
		email: this.email,
		password: this.password,
		role: this.role,
	};

	return jwt.sign(tokenObject, process.env.SECRET);
});

Users.virtual('capabilities').get(function () {
	let acl = {
		user: ['read'],
		editor: ['read', 'create', 'update'],
		admin: ['read', 'create', 'update', 'delete'],
	};
	return acl[this.role];
});

Users.pre('save', async function () {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 10);
	}
});

Users.pre('findOneAndUpdate', async function () {
	this._update.password = await bcrypt.hash(this._update.password, 10);
});

// BASIC AUTH
Users.statics.authenticateBasic = async function (username, password) {
	try {
		if (username) {
			const user = await this.findOne({ username });
			const valid = await bcrypt.compare(password, user.password);
			if (valid) {
				return user;
			}
		} else {
			throw new Error('Invalid User');
		}
	} catch (error) {
		throw new Error(error.message);
	}
};

// BEARER AUTH
Users.statics.authenticateWithToken = async function (token) {
	try {
		const parsedToken = jwt.verify(token, process.env.SECRET);
		const user = await this.findOne({ username: parsedToken.username });
		if (user) {
			return user;
		}
		throw new Error('User Not Found');
	} catch (e) {
		throw new Error(e.message);
	}
};

module.exports = mongoose.model('Users', Users);
