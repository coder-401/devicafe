'use strict';

const base64 = require('base-64');
const User = require('./../../database/models/user');

module.exports = async (req, res, next) => {
	// if (
	// 	!req.headers.authorization ||
	// 	req.headers.authorization.split(' ')[0] !== 'Basic'
	// ) {
	// 	return _authError();
	// }

	// let basic = req.headers.authorization.split(' ').pop();

	// let [user, pass] = base64.decode(basic).split(':');

	const { username, password } = req.body;

	console.log(username, password);

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
