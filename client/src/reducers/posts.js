const intialState = {
	posts: [],
};

const posts = (state = intialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case 'POSTS':
			return { posts: [...payload] };

		case 'CREATE_POST':
			return { posts: [...state.posts, payload].reverse() };

		case 'UPDATE_POST':
			return {
				posts: state.posts.map((post) => {
					if (post._id === payload._id) {
						return payload;
					} else {
						return post;
					}
				}),
			};

		case 'DELETE_POST':
			return {
				posts: state.posts.filter((post) => post._id !== payload._id).reverse(),
			};

		default:
			return state;
	}
};

export default posts;

export const getPost = (posts) => {
	return {
		type: 'POSTS',
		payload: posts,
	};
};

export const createPost = (post) => {
	return {
		type: 'CREATE_POST',
		payload: post,
	};
};

export const editPost = (post) => {
	return {
		type: 'UPDATE_POST',
		payload: post,
	};
};

export const deletePost = (post) => {
	return {
		type: 'DELETE_POST',
		payload: post,
	};
};
