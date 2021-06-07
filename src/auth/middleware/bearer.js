'use strict';

const User = require('./../../database/models/user');

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ').pop();

		const validUser = await User.authenticateWithToken(token);
		req.user = validUser;
		next();
	} catch (e) {
		console.log(e);
		_authError();
	}

	function _authError() {
		res.status(403).send('Invalid Login');
	}
};
