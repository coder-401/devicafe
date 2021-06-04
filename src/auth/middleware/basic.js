'use strict';

const User = require('./../../database/models/user');

module.exports = async (req, res, next) => {
	const { email, username, password } = req.body;

	try {
		req.user = await User.authenticateBasic(email, username, password);
		next();
	} catch (e) {
		_authError();
	}

	function _authError() {
		res.status(400).json('incorrect credentials');
	}
};
