import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { If, Then } from 'react-if';
import axios from 'axios';
import Post from './../post';

import { getPost, createPost } from './../../reducers/posts';

const Posts = () => {
	const dispatch = useDispatch();

	const state = useSelector((state) => {
		return {
			posts: state.posts.posts,
			token: state.signIn.token,
			user: state.signIn.user,
		};
	});

	useEffect(async () => {
		const response = await axios.get('http://localhost:5000/posts', {
			headers: {
				Authorization: `Bearer ${state.token}`,
			},
		});

		dispatch(getPost(response.data.reverse()));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newPost = {
			description: e.target.description.value,
			owner: state.user._id,
			time: new Date().toString(),
		};

		const response = await axios.post(`http://localhost:5000/post`, newPost, {
			headers: {
				Authorization: `Bearer ${state.token}`,
			},
		});

		dispatch(createPost(response.data));
	};

	return (
		<React.Fragment>
			<form onSubmit={handleSubmit}>
				<input type="text" name="description" />
				<button>Add New Post</button>
			</form>
			<If condition={state.posts.length}>
				<Then>
					{state.posts.map((post) => (
						<div key={post._id}>
							<hr />
							<Post Post={post} />
							<hr />
						</div>
					))}
				</Then>
			</If>
		</React.Fragment>
	);
};

export default Posts;
