'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FavQuestions = new Schema({
	question: {
		type: Schema.Types.ObjectId,
		ref: 'Question',
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
	},
});

module.exports = mongoose.model('FavQuestions', FavQuestions);
