import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { If, Then } from 'react-if';
import axios from 'axios';
import Comment from './../comment';
import '../comment/comment.css';
import { getComment, createComment } from './../../reducers/comments';
import { Button, Form, Accordion, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

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
		try {
			const response = await axios.get(
				'https://backenders-devecafe.herokuapp.com/comments',
				{
					headers: {
						Authorization: `Bearer ${state.token}`,
					},
				},
			);

			dispatch(getComment(response.data));
		} catch (error) {
			toast.error('Something Wrong!!!!', {
				autoClose: 2000,
				pauseOnHover: false,
			});
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const newComment = {
				description: e.target.description.value,
				owner: state.user._id,
				post: postId,
			};

			const response = await axios.post(
				`https://backenders-devecafe.herokuapp.com/comment`,
				newComment,
				{
					headers: {
						Authorization: `Bearer ${state.token}`,
					},
				},
			);
			e.target.description.value = '';
			e.target.description.focus();
			dispatch(createComment(response.data));
			toast.info('Comment Created successfully', {
				autoClose: 2000,
				pauseOnHover: false,
			});
		} catch (error) {
			toast.error('Something Wrong!!!!', {
				autoClose: 2000,
				pauseOnHover: false,
			});
		}
	};

	let comments = state.comments.filter((comment) => comment.post === postId);
	return (
		<div className="commentsContainer">
			<Accordion>
				<Accordion.Toggle as={Button} variant="dark" eventKey="0">
					View {comments.length} Comments
				</Accordion.Toggle>
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
			<ToastContainer />
		</div>
	);
};

export default Comments;
