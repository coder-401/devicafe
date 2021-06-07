import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { If, Then } from 'react-if';
import axios from 'axios';
import Post from './../post';
import { Button, Form, Modal } from 'react-bootstrap';
import '../post/post.css';
import { getPost, createPost } from './../../reducers/posts';
import Switch from 'react-switch';
import { IoMdSunny } from 'react-icons/io';
import { BsMoon } from 'react-icons/bs';
import { BsSearch } from 'react-icons/bs';

const Posts = () => {
	const [modalShow, setModalShow] = useState(false);
	const [theme, setTheme] = useState(false);
	// const [search, setSearch] = useState([])

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
		setModalShow(false);
		dispatch(createPost(response.data));
	};
	const toggleTheme = () => {
		theme ? setTheme(false) : setTheme(true);
	};

	const searchSubmit = async (e)=>{
		e.preventDefault();
		const response = await axios.get('http://localhost:5000/posts', {
			headers: {
				Authorization: `Bearer ${state.token}`,
			},
		});

		let reg = `\\b(\\w*${e.target.search.value}\\w*)\\b`;
		let regex = new RegExp(reg,"g");
		let arr = await response.data.filter((obj)=>{
			return regex.test(obj.description)
		})
		dispatch(getPost(arr.reverse()));
	}
	const searchChange = async (e)=>{
		e.preventDefault();
		const response = await axios.get('http://localhost:5000/posts', {
			headers: {
				Authorization: `Bearer ${state.token}`,
			},
		});

		let reg = `\\b(\\w*${e.target.value}\\w*)\\b`;
		let regex = new RegExp(reg,"g");
		let arr = await response.data.filter((obj)=>{
			return regex.test(obj.description)
		})
		dispatch(getPost(arr.reverse()));
	}
	return (
		<If condition={state.token}>
			<Then>
				<div className={theme + 'Theme'}>
					<div className="searchDiv">
						<div style={{display:"flex",flexDirection:"row"}}>
						{theme ? <BsMoon style={moonStyle} /> : <IoMdSunny style={sunStyle} />}
						<Switch
							className="switch_theme"
							handleDiameter={25}
							uncheckedIcon={false}
							checkedIcon={false}
							// offColor="red"
							onColor="#3498db"
							checked={theme}
							height={25}
							width={50}
							onChange={toggleTheme}
						/>
						</div>
						<Form onSubmit={searchSubmit}>
							<Form.Control placeholder="Search" name="search" onChange={searchChange}/>
							<Button type="submit"><BsSearch/></Button>
						</Form>

					</div>
					<div className="postsContainer">
						<div style={{ textAlign: 'center', padding: 0 }}>
							<h3 style={{ color: theme ? '#fff' : 'black' }}>Got Stuck ?</h3>
							<button className="grow_spin" onClick={() => setModalShow(true)}>
								Ask Our Community
							</button>
						</div>
						<Modal
							className="askModal"
							show={modalShow}
							onHide={() => setModalShow(false)}
							size="lg"
							aria-labelledby="contained-modal-title-vcenter"
							centered
						>
							<Modal.Header className="modalHeader" closeButton>
								<Modal.Title id="contained-modal-title-vcenter">
									What Is Your Question ?
								</Modal.Title>
							</Modal.Header>
							<Modal.Body className="modalBody">
								<Form className="askForm" onSubmit={handleSubmit}>
									<Form.Control as="textarea" name="description" rows={5} />
									<Button type="submit">Add New Post</Button>
								</Form>
							</Modal.Body>
						</Modal>

						<hr />
						<If condition={state.posts.length}>
							<Then>
								{state.posts.map((post) => (
									<div key={post._id}>
										<Post Theme={theme} Post={post} />
										<hr />
									</div>
								))}
							</Then>
						</If>
					</div>
				</div>
			</Then>
		</If>
	);
};
export default Posts;
const sunStyle = {
	color: "#6f6f6f",
	fontSize: "2rem",
}
const moonStyle = {
	color: "#3498db",
	fontSize: "2rem",
}