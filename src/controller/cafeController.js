'use strict';

const fs = require('fs');
const questions = JSON.parse(fs.readFileSync('questions.json').toString());
const uuid = require('uuid').v4;

const collection = require('./../database/controller/data-collection');

const UserModel = require('./../database/models/user');
const userCollection = new collection(UserModel);

let secondUserRole, secondUserTopic, secondUserDifficulty;
let newQuestions;

const cafeEntrance = (req, res) => {
	const userId = req.params.id;
	const tableId = uuid();
	res.render('cafe/entrance', { userId, tableId });
};

const getTable = async (req, res) => {
	const tableId = req.params.tableId;
	const userId = req.params.id;
	const { role, topic, difficulty } = req.query;

	const username = await userCollection.get(userId);

	newQuestions = questions.filter((question) => {
		return question.category === topic && question.difficulty === difficulty;
	});

	secondUserRole = role === 'interviewer' ? 'interviewee' : 'interviewer';
	secondUserTopic = topic;
	secondUserDifficulty = difficulty;

	if (role === 'interviewer') {
		return res.render('cafe/table', {
			userId,
			tableId,
			role,
			topic,
			difficulty,
			username: username.username,
			questions: newQuestions,
		});
	}

	res.render('cafe/table', {
		userId,
		tableId,
		role,
		topic,
		difficulty,
		username: username.username,
	});
};

const getSpecificTable = async (req, res) => {
	const tableId = req.body.tableId;
	const userId = req.params.id;

	if (tableId.length === 36) {
		const username = await userCollection.get(userId);

		if (secondUserRole === 'interviewer') {
			return res.render('cafe/table', {
				userId,
				tableId,
				role: secondUserRole,
				topic: secondUserTopic,
				difficulty: secondUserDifficulty,
				username: username.username,
				questions: newQuestions,
			});
		}

		res.render('cafe/table', {
			userId,
			tableId,
			role: secondUserRole,
			topic: secondUserTopic,
			username: username.username,
			difficulty: secondUserDifficulty,
		});
	}

	return res.redirect(`/cafe/${userId}`);
};

module.exports = {
	cafeEntrance,
	getTable,
	getSpecificTable,
};
