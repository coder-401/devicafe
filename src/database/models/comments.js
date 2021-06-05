'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Comments = new Schema({
	description: { type: String, required: true },
	post: {
		type: Schema.Types.ObjectId,
		ref: 'Posts',
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
	},
	time: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comments', Comments);
