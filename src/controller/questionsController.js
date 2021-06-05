'use strict';

const fs = require('fs');
const questions = JSON.parse(fs.readFileSync('questions.json').toString());

const getQuestions = async (req, res) => {
	try {
		res.status(200).json(questions);
	} catch (error) {
		console.log(error);
		res.status(403).json({ error: error.message });
	}
};

module.exports = {
	getQuestions,
};
