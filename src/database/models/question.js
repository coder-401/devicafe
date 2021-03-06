'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Question = new Schema({
	question: { type: String, required: true },
	answer: { type: String, required: true },
	difficulty: { type: String, required: true },
	category: { type: String, required: true },
});

module.exports = mongoose.model('Question', Question);
