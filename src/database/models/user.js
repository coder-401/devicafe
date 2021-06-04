'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

let users = new Schema({
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

users.virtual('token').get(function () {
	let tokenObject = {
		username: this.username,
	};

	return jwt.sign(tokenObject, process.env.SECRET);
});

users.virtual('capabilities').get(function () {
	let acl = {
		user: ['read'],
		editor: ['read', 'create', 'update'],
		admin: ['read', 'create', 'update', 'delete'],
	};
	return acl[this.role];
});

users.pre('save', async function () {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 10);
	}
});

// BASIC AUTH
users.statics.authenticateBasic = async function (email, username, password) {
	try {
		if (username) {
			const user = await this.findOne({ username });
			const valid = await bcrypt.compare(password, user.password);
			if (valid) {
				return user;
			}
		} else if (email) {
			const user = await this.findOne({ email });
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
users.statics.authenticateWithToken = async function (token, userId) {
	try {
		const parsedToken = jwt.verify(token, process.env.SECRET);
		const user = await this.findOne({ username: parsedToken.username });
		if (user) {
			if (user._id.toString() === userId.toString()) return user;
		}
		throw new Error('User Not Found');
	} catch (e) {
		throw new Error(e.message);
	}
};

module.exports = mongoose.model('users', users);
