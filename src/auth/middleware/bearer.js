'use strict';

const User = require('./../../database/models/user');

module.exports = async (req, res, next) => {
	try {
		const token = req.cookies.access_token;
		const userId = req.params.id;
		const validUser = await User.authenticateWithToken(token, userId);

		req.user = validUser;
		next();
	} catch (e) {
		_authError();
	}

	function _authError() {
		res.status(403).send('Invalid Login');
	}
};
