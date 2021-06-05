'use strict';

const collection = require('../database/controller/data-collection');
const TableModel = require('../database/models/table');
const tableCollection = new collection(TableModel);

const getTable = async (req, res) => {
	try {
		const id = req.params.id;
		const table = await tableCollection.get(id);

		res.status(200).json(table);
	} catch (e) {
		res.status(403).json({ error: e.message });
	}
};

const createTable = async (req, res) => {
	try {
		const record = req.body;
		const table = await tableCollection.create(record);

		res.status(200).json(table);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
};

module.exports = {
	getTable,
	createTable,
};
