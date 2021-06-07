import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { editComment, deleteComment } from './../../reducers/comments';
import './comment.css';
import Avatar from 'react-avatar';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BiEditAlt } from 'react-icons/bi';

const Comment = ({ Comment }) => {
	const [commentId, setCommentId] = useState('');
	const [update, setUpdate] = useState(false);

	const { description, owner, time, _id } = Comment;
	const dispatch = useDispatch();

	const state = useSelector((state) => {
		return {
			token: state.signIn.token,
			user: state.signIn.user,
		};
	});

	const handleDelete = async (id) => {
		const response = await axios.delete(`http://localhost:5000/comment/${id}`, {
			headers: {
				Authorization: `Bearer ${state.token}`,
			},
		});

		dispatch(deleteComment(response.data));
	};

	const handleUpdate = (id) => {
		setCommentId(id);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newData = { description: e.target.description.value };

		const response = await axios.put(
			`http://localhost:5000/comment/${commentId}`,
			newData,
			{
				headers: {
					Authorization: `Bearer ${state.token}`,
				},
			},
		);

		setCommentId('');
		dispatch(editComment(response.data));
    };
	const toggleUpdate = ()=>{
		update ? setUpdate(false) : setUpdate(true);
	}


	return (
		<div>
			<Card text="dark">
				<Card.Body>
					<Avatar textMarginRatio={0.2} textSizeRatio={2} name={owner.username} size="30" round={true} /> {owner.username}
					<Card.Text className="commentTime" as="p">{time}</Card.Text>
					<hr />
					<Card.Text as="p">{description}</Card.Text>
					{commentId === _id && update ?
						<Form className="commentEditFrom" onSubmit={handleSubmit}>
							<Form.Control
								defaultValue={description}
								name="description"
							/>
							<Button type="submit">Edit</Button>
						</Form>
						: null
					}

					{owner._id === state.user._id ?
					<div className="editDeleteDiv">
						<BiEditAlt className="editIcon" onClick={() => {
							handleUpdate(_id);
							toggleUpdate();
						}} />
						<RiDeleteBin5Line className="deleteIcon" onClick={() => handleDelete(_id)} />
					</div>
						: null
					}
				</Card.Body>
			</Card>



			{/* 
			<If condition={owner._id === state.user._id}>
				<Then>
					<AiFillDelete onClick={() => handleDelete(_id)} />
					<If condition={commentId === _id}>
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
			</If> */}
		</div>
	);
};

export default Comment;
