import cookie from 'react-cookies';

const intialState = {
	user: '',
	token: '',
};

const signIn = (state = intialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'LOGIN':
			const { user, token } = payload;
			cookie.save('auth', token);
			return { user, token };

		case 'LOGOUT':
			cookie.remove('auth');
			return { user: payload.user, token: payload.token };

		default:
			return state;
	}
};

export default signIn;

export const login = (user) => {
	return {
		type: 'LOGIN',
		payload: user,
	};
};

export const logout = (user) => {
	return {
		type: 'LOGOUT',
		payload: user,
	};
};
