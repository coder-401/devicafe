'use strict';

const User = require('./../../database/models/user');
let token;
module.exports = async (req, res, next) => {
	try {
		token = req.cookies.access_token;
		
		if(!token){
			token = req.headers.authorization.split(' ').pop();
		}
		const userId = req.params.id;
		if (token.length > 300) {
			next();
		} else {
			const validUser = await User.authenticateWithToken(token, userId);
			req.user = validUser;
			next();
		}
	} catch (e) {
		_authError();
	}

	function _authError() {
		res.status(403).send('Invalid Login');
	}
};
