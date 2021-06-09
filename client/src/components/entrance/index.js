import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { If, Then, Else } from 'react-if';
import { ToastContainer, toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import cookie from 'react-cookies';
import './entrance.css';
import { IoMdArrowRoundBack } from 'react-icons/io';

const Entrance = () => {
	const [tablee, setTablee] = useState(false);
	const history = useHistory();

	const state = useSelector((state) => {
		return {
			token: state.signIn.token,
			user: state.signIn.user,
		};
	});

	const handleLogin = () => {
		history.push('/login');
	};

	const newTable = async (e) => {
		try {
			e.preventDefault();

			const tabelData = {
				topic: e.target.topic.value,
				role: e.target.role.value,
				difficulty: e.target.difficulty.value,
				owner: state.user._id,
			};

			const { data } = await axios.post(
				'https://backenders-devecafe.herokuapp.com/table',
				tabelData,
				{
					headers: {
						Authorization: `Bearer ${state.token}`,
					},
				},
			);

			history.push({
				pathname: `/cafe/${data._id}`,
				state: data,
			});
		} catch (error) {
			toast.error('Something Wrong!!!!', {
				autoClose: 2000,
				pauseOnHover: false,
			});
		}
	};

	const getTable = async (e) => {
		try {
			e.preventDefault();

			const id = e.target.tableId.value;

			const { data } = await axios.get(
				`https://backenders-devecafe.herokuapp.com/table/${id}`,
				{
					headers: {
						Authorization: `Bearer ${cookie.load('auth')}`,
					},
				},
			);

			history.push({
				pathname: `/cafe/${data._id}`,
				state: data,
			});
		} catch (error) {
			toast.error('Something Wrong!!!!', {
				autoClose: 2000,
				pauseOnHover: false,
			});
		}
	};

	return (
		<React.Fragment>
			<div className="tableContainer">
				{!tablee ? (
					<If condition={cookie.load('auth')}>
						<Then>
							<React.Fragment>
								<Form className="entranceTable" onSubmit={newTable}>
									<legend>Get an Interview room</legend>
									<Form.Label>Topic</Form.Label>
									<Form.Control as="select" name="topic">
										<option value="">none</option>
										<option value="javascript">JavaScript</option>
										<option value="node">NodeJS</option>
										<option value="react">ReactJS</option>
									</Form.Control>
									<Form.Label>Role</Form.Label>

									<Form.Control as="select" name="role">
										<option value="">none</option>
										<option value="interviewer">Interviewer</option>
										<option value="interviewee">Interviewee</option>
									</Form.Control>
									<Form.Label>Difficulty</Form.Label>

									<Form.Control as="select" name="difficulty">
										<option value="">none</option>
										<option value="beginner">Still Fresh</option>
										<option value="intermidate">Joniur Developer</option>
										<option value="advance">Senior Developer</option>
									</Form.Control>
									<Button type="submit">Get your Table</Button>
									<a
										onClick={() => {
											setTablee(true);
										}}
										style={{ marginBottom: '5%' }}
									>
										Already have table ID ?
									</a>
								</Form>
							</React.Fragment>
						</Then>
						<Else>{handleLogin}</Else>
					</If>
				) : (
					<Form className="haveTable" onSubmit={getTable}>
						<IoMdArrowRoundBack
							style={{
								cursor: 'pointer',
								margin: '1% 0 0 1%',
								position: 'absolute',
								fontSize: '2rem',
							}}
							onClick={() => setTablee(false)}
							className="arrow"
						/>
						<Form.Label>Table Id</Form.Label>
						<Form.Control placeholder="table Id" name="tableId" />
						<Button type="submit">Go to your table</Button>
					</Form>
				)}
				<ToastContainer />
			</div>
		</React.Fragment>
	);
};

export default Entrance;
