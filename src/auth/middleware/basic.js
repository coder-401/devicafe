'use strict';

const User = require('./../../database/models/user');

module.exports = async (req, res, next) => {
	const { username, password } = req.body;

	try {
		req.user = await User.authenticateBasic(username, password);
		next();
	} catch (e) {
		_authError();
	}

	function _authError() {
		res.status(403).send('Invalid Login');
	}
};
