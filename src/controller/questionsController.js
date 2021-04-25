'use strict';

const fs = require('fs');
const questions = JSON.parse(fs.readFileSync('questions.json').toString());

const getQuestions = (req, res) => {
	try {
		let userId = req.params.id;
		let type = req.query.type;
		let difficulty = req.query.difficulty;
		let newQuestions;

		if (type && difficulty) {
			if (type !== 'none' && difficulty !== 'none') {
				newQuestions = questions.filter((question) => {
					return (
						question.category === type && question.difficulty === difficulty
					);
				});
			} else if (type !== 'none') {
				newQuestions = questions.filter((question) => {
					return question.category === type;
				});
			} else if (difficulty !== 'none') {
				newQuestions = questions.filter((question) => {
					return question.difficulty === difficulty;
				});
			} else {
				newQuestions = questions;
			}
			res.render('questions', { questions: newQuestions, userId });
		} else {
			res.render('questions', { questions, userId });
		}
	} catch (error) {
		res.status(403).json({ error: error.message });
	}
};

module.exports = {
	getQuestions,
};
