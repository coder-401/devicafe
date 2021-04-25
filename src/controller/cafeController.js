'use strict';

const fs = require('fs');
const questions = JSON.parse(fs.readFileSync('questions.json').toString());
const uuid = require('uuid').v4;

const cafeEntrance = (req, res) => {
	const userId = req.params.id;
	const tableId = uuid();
	res.render('cafe/entrance', { userId, tableId });
};

const getTable = (req, res) => {
	const tableId = req.params.tableId;
	res.render('cafe/zoom', { tableId });
};

module.exports = {
	cafeEntrance,
	getTable,
};
