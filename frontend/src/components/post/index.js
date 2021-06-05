import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Else, If, Then } from 'react-if';
import axios from 'axios';
import Comments from './../comments';

import { editPost, deletePost } from './../../reducers/posts';

const Post = ({ Post }) => {
	const [postId, setPostId] = useState('');

	const { description, owner, time, _id } = Post;
	const dispatch = useDispatch();

	const state = useSelector((state) => {
		return {
			token: state.signIn.token,
			user: state.signIn.user,
		};
	});

	const handleDelete = async (id) => {
		const response = await axios.delete(`http://localhost:5000/post/${id}`, {
			headers: {
				Authorization: `Bearer ${state.token}`,
			},
		});

		dispatch(deletePost(response.data));
	};

	const handleUpdate = (id) => {
		setPostId(id);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newData = { description: e.target.description.value };

		const response = await axios.put(
			`http://localhost:5000/post/${postId}`,
			newData,
			{
				headers: {
					Authorization: `Bearer ${state.token}`,
				},
			},
		);

		setPostId('');
		dispatch(editPost(response.data));
	};

	return (
		<div>
			<p>
				{owner.username} {time}
			</p>
			<p>description: {description}</p>
			<If condition={owner._id === state.user._id}>
				<Then>
					<button onClick={() => handleDelete(_id)}>Delete</button>
					<If condition={postId === _id}>
						<Then>
							<form onSubmit={handleSubmit}>
								<input
									type="text"
									defaultValue={description}
									name="description"
								/>
								<button>Update</button>
							</form>
						</Then>
						<Else>
							<button onClick={() => handleUpdate(_id)}>Update</button>
						</Else>
					</If>
				</Then>
			</If>
			<Comments postId={_id} />
		</div>
	);
};

export default Post;
