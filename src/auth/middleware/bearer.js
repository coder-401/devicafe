'use strict';

const User = require('./../../database/models/user');

module.exports = async (req, res, next) => {
	try {
		if (
			!req.headers.authorization ||
			req.headers.authorization.split(' ')[0] !== 'Bearer'
		) {
			_authError();
		}

		const token = req.headers.authorization.split(' ').pop();
		const validUser = await User.authenticateWithToken(token);

		req.user = validUser;
		req.token = validUser.token;
		next();
	} catch (e) {
		_authError();
	}

	function _authError() {
		res.status(403).send('Invalid Login');
	}
};
