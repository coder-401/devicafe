'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Table = new Schema({
	topic: { type: String, required: true },
	role: { type: String, required: true },
	difficulty: { type: String, required: true },
});

module.exports = mongoose.model('Tables', Table);
