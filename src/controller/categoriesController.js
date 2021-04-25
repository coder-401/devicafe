'use strict';

const getCategories = (req, res) => {
	const userId = req.params.id;
	res.render('categories', { userId });
};

module.exports = {
	getCategories,
};
