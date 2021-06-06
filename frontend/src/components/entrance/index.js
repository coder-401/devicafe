import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Entrance = () => {
	const history = useHistory();

	const state = useSelector((state) => {
		return {
			token: state.signIn.token,
			user: state.signIn.user,
		};
	});

	const newTable = async (e) => {
		try {
			e.preventDefault();

			const tabelData = {
				topic: e.target.topic.value,
				role: e.target.role.value,
				difficulty: e.target.difficulty.value,
			};

			const { data } = await axios.post(
				'http://localhost:5000/table',
				tabelData,
				{
					headers: {
						Authorization: `Bearer ${state.token}`,
					},
				},
			);

			history.push(`/cafe/${data._id}`);
		} catch (error) {
			console.log(error);
		}
	};

	const getTable = async (e) => {
		try {
			e.preventDefault();

			const id = e.target.tableId.value;

			const { data } = await axios.get(`http://localhost:5000/table/${id}`, {
				headers: {
					Authorization: `Bearer ${state.token}`,
				},
			});

			history.push(`/cafe/${data._id}`);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<React.Fragment>
			<form onSubmit={newTable}>
				<select name="topic">
					<option value="">none</option>
					<option value="javascript">JavaScript</option>
					<option value="node">NodeJS</option>
					<option value="react">ReactJS</option>
				</select>
				<select name="role">
					<option value="">none</option>
					<option value="interviewer">Interviewer</option>
					<option value="interviewee">Interviewee</option>
				</select>
				<select name="difficulty">
					<option value="">none</option>
					<option value="beginner">Still Fresh</option>
					<option value="intermidate">Joniur Developer</option>
					<option value="advance">Senior Developer</option>
				</select>
				<button>Get your Table</button>
			</form>

			<form onSubmit={getTable}>
				<input type="text" placeholder="table Id" name="tableId" />
				<button>Get your Table</button>
			</form>
		</React.Fragment>
	);
};

export default Entrance;
