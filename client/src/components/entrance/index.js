import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { If, Then, Else } from 'react-if';
import { ToastContainer, toast } from 'react-toastify';
import cookie from 'react-cookies';

const Entrance = () => {
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

			const { data } = await axios.get(`http://localhost:5000/table/${id}`, {
				headers: {
					Authorization: `Bearer ${state.token}`,
				},
			});

			history.push({
				pathname: `/cafe/${data._id}`,
				state: data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<React.Fragment>
			<If condition={cookie.load('auth')}>
				<Then>
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
				</Then>
				<Else>{handleLogin}</Else>
			</If>
			<ToastContainer />
		</React.Fragment>
	);
};

export default Entrance;
