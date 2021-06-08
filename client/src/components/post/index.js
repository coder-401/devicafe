import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Comments from './../comments';
import { Card, Button, Form, Dropdown } from 'react-bootstrap';
import { editPost, deletePost } from './../../reducers/posts';
import Avatar from 'react-avatar';
import { BsThreeDotsVertical } from 'react-icons/bs';
import './post.css';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BiEditAlt } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';

const Post = ({ Post, Theme }) => {
	const [postId, setPostId] = useState('');
	const [dot, setDot] = useState(false);
	const [cardBg, setCardBg] = useState('light');
	const [cardText, setCardText] = useState('dark');

	const { description, owner, time, _id } = Post;
	const dispatch = useDispatch();
	const state = useSelector((state) => {
		return {
			token: state.signIn.token,
			user: state.signIn.user,
		};
	});

	const handleDelete = async (id) => {
		try {
			const response = await axios.delete(
				`https://backenders-devecafe.herokuapp.com/post/${id}`,
				{
					headers: {
						Authorization: `Bearer ${state.token}`,
					},
				},
			);

			dispatch(deletePost(response.data));
			toast.info('Post Deleted successfully', {
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

	const handleUpdate = (id) => {
		setPostId(id);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const newData = { description: e.target.description.value };

			const response = await axios.put(
				`https://backenders-devecafe.herokuapp.com/post/${postId}`,
				newData,
				{
					headers: {
						Authorization: `Bearer ${state.token}`,
					},
				},
			);

			setPostId('');
			dispatch(editPost(response.data));
			toast.info('Post Updated successfully', {
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

	const toggleList = () => {
		dot ? setDot(false) : setDot(true);
	};
	useEffect(() => {
		Theme ? setCardBg('light') : setCardBg('dark');
		Theme ? setCardText('dark') : setCardText('light');
	}, [Theme]);

	return (
		<Card bg={cardBg} text={cardText}>
			<Card.Body>
				<Dropdown>
					<Dropdown.Toggle id="dropdown-basic">
						<BsThreeDotsVertical
							style={{ color: Theme ? 'black' : '#fff' }}
							className="threeDots"
						/>
					</Dropdown.Toggle>

					{owner._id === state.user._id ? (
						<Dropdown.Menu style={{ overflow: 'hidden' }}>
							<Dropdown.Item
								className="editItem"
								onClick={() => {
									handleUpdate(_id);
									toggleList();
								}}
							>
								<h5>Edit</h5> <BiEditAlt />
							</Dropdown.Item>
							<hr style={{ margin: 0 }} />
							<Dropdown.Item
								className="deleteItem"
								onClick={() => handleDelete(_id)}
							>
								<h5>Delete</h5> <RiDeleteBin5Line id="deleteIcon" />
							</Dropdown.Item>
						</Dropdown.Menu>
					) : null}
				</Dropdown>

				<Card.Text as="h4">
					<Avatar
						textMarginRatio={0.2}
						textSizeRatio={2}
						name={owner.username}
						size="40"
						round={true}
					/>{' '}
					{owner.username}
				</Card.Text>
				<Card.Text className="postTime" as="h6">
					{time}
				</Card.Text>
				<Card.Text style={{ margin: '18px 0 0 47px' }} as="p">
					{description}
				</Card.Text>
				<hr />

				{postId === _id && dot ? (
					<Form className="postEditForm" onSubmit={handleSubmit}>
						<Form.Control defaultValue={description} name="description" />
						<Button type="submit">Edit</Button>
					</Form>
				) : null}
			</Card.Body>
			<Comments postId={_id} />
			<ToastContainer />
		</Card>
	);
};

export default Post;
