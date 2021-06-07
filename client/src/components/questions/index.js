import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { If, Then, Else } from 'react-if';
import axios from 'axios';
import Question from './../question';
import { ToastContainer, toast } from 'react-toastify';
import { getQuestion } from './../../reducers/questions';
import cookie from 'react-cookies';

const Questions = () => {
	const dispatch = useDispatch();
	const [questions, setQuestions] = useState([]);
	const history = useHistory();

	const state = useSelector((state) => {
		return {
			questions: state.questions.questions,
			token: state.signIn.token,
		};
	});

	const handleLogin = () => {
		history.push('/login');
	};

	useEffect(async () => {
		try {
			const response = await axios.get('http://localhost:5000/questions');

			setQuestions([...response.data]);
			dispatch(getQuestion(response.data));
		} catch (error) {
			toast.error('Something Wrong!!!!', {
				autoClose: 2000,
				pauseOnHover: false,
			});
		}
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		let filterQuestions;

		if (e.target.topic.value)
			filterQuestions = state.questions.filter(
				(question) => question.category === e.target.topic.value,
			);

		if (e.target.difficulty.value)
			filterQuestions = state.questions.filter(
				(question) => question.difficulty === e.target.difficulty.value,
			);

		if (e.target.difficulty.value && e.target.topic.value)
			filterQuestions = state.questions.filter(
				(question) =>
					question.difficulty === e.target.difficulty.value &&
					question.category === e.target.topic.value,
			);

		if (!e.target.topic.value && !e.target.difficulty.value)
			setQuestions([...state.questions]);
		else setQuestions([...filterQuestions]);
	};

	return (
		<React.Fragment>
			<If condition={cookie.load('auth')}>
				<Then>
					<form onSubmit={handleSubmit}>
						<select name="topic">
							<option value="">none</option>
							<option value="javascript">JavaScript</option>
							<option value="node">NodeJS</option>
							<option value="react">ReactJS</option>
						</select>
						<select name="difficulty">
							<option value="">none</option>
							<option value="beginner">Still Fresh</option>
							<option value="intermidate">Joniur Developer</option>
							<option value="advance">Senior Developer</option>
						</select>
						<button>Get your Questions</button>
					</form>
					<If condition={state.questions.length}>
						<Then>
							{questions.map((question) => (
								<div key={question.id} className="question">
									<Question Question={question} />
								</div>
							))}
						</Then>
					</If>
				</Then>
				<Else>{handleLogin}</Else>
			</If>
			<ToastContainer />
		</React.Fragment>
	);
};

export default Questions;
