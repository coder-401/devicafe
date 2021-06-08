'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Table = new Schema({
	topic: { type: String, required: true },
	role: { type: String, required: true },
	difficulty: { type: String, required: true },
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
	},
});

module.exports = mongoose.model('Tables', Table);
