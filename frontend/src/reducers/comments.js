const intialState = {
	comments: [],
};

const comments = (state = intialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'COMMENTS':
			return { comments: [...payload] };

		case 'CREATE_COMMENT':
			return { comments: [...state.comments, payload] };

		case 'UPDATE_COMMENT':
			return {
				comments: state.comments.map((comment) => {
					if (comment._id === payload._id) {
						return payload;
					} else {
						return comment;
					}
				}),
			};

		case 'DELETE_COMMENT':
			return {
				comments: state.comments.filter(
					(comment) => comment._id !== payload._id,
				),
			};

		default:
			return state;
	}
};

export default comments;

export const getComment = (comments) => {
	return {
		type: 'COMMENTS',
		payload: comments,
	};
};

export const createComment = (comment) => {
	return {
		type: 'CREATE_COMMENT',
		payload: comment,
	};
};

export const editComment = (comment) => {
	return {
		type: 'UPDATE_COMMENT',
		payload: comment,
	};
};

export const deleteComment = (comment) => {
	return {
		type: 'DELETE_COMMENT',
		payload: comment,
	};
};
