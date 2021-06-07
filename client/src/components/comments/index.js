import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { If, Then } from 'react-if';
import axios from 'axios';
import Comment from './../comment';
import '../comment/comment.css';
import { getComment, createComment } from './../../reducers/comments';
import { Button, Form, Accordion, Card } from 'react-bootstrap';

const Comments = ({ postId }) => {
	const dispatch = useDispatch();

	const state = useSelector((state) => {
		return {
			posts: state.posts.posts,
			comments: state.comments.comments,
			token: state.signIn.token,
			user: state.signIn.user,
		};
	});

	useEffect(async () => {
		const response = await axios.get('http://localhost:5000/comments', {
			headers: {
				Authorization: `Bearer ${state.token}`,
			},
		});

		dispatch(getComment(response.data));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newComment = {
			description: e.target.description.value,
			owner: state.user._id,
			post: postId,
			time: new Date(),
		};

		const response = await axios.post(
			`http://localhost:5000/comment`,
			newComment,
			{
				headers: {
					Authorization: `Bearer ${state.token}`,
				},
			},
		);

		dispatch(createComment(response.data));
	};

	let comments = state.comments.filter((comment) => comment.post === postId);
	return (
		<div className="commentsContainer">
			<Accordion>
				<Accordion.Toggle as={Button} variant="dark" eventKey="0">View {comments.length} Comments</Accordion.Toggle>
				<Accordion.Collapse eventKey="0">
					<Card.Body>
						<If condition={comments.length}>
							<Then>
								{comments.map((comment) => (
									<div key={comment._id}>
										<Comment Comment={comment} />
										<hr />
									</div>
								))}
							</Then>
						</If>
						<Form className="commentForm" onSubmit={handleSubmit}>
							<Form.Control name="description" />
							<Button type="submit">Comment</Button>
						</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Accordion>
		</div>
	);
};

export default Comments;
