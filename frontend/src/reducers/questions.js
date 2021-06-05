const intialState = {
	questions: [],
};

const questions = (state = intialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'QUESTION':
			const questions = [...payload];
			return { questions };

		default:
			return state;
	}
};

export default questions;

export const getQuestion = (questions) => {
	return {
		type: 'QUESTION',
		payload: questions,
	};
};
