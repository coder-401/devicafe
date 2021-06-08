'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Posts = new Schema({
	description: { type: String, required: true },
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
	},
	time: { type: String, default: new Date().toDateString() },
});

module.exports = mongoose.model('Posts', Posts);
