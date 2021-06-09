import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { If, Then, Else } from 'react-if';
import axios from 'axios';
import Question from './../question';
import { ToastContainer, toast } from 'react-toastify';
import { getQuestion } from './../../reducers/questions';
import cookie from 'react-cookies';
import './questions.css';
import { Form, Col, Button } from 'react-bootstrap';

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
			const response = await axios.get(
				'https://backenders-devecafe.herokuapp.com/questions',
			);

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
			<div className="questions-div" style={{top:"0", position:"absolute",width:"100%"}}>

				<If condition={cookie.load('auth')}>
					<Then>
						<Form onSubmit={handleSubmit} className="filter-form" style={{marginTop:"7%"}}>
							<Form.Row className="align-items-center">
								<Col xs="auto" className="my-1">
									<Form.Label
										className="mr-sm-2"
										htmlFor="inlineFormCustomSelect"
										srOnly
									>
										Preference
									</Form.Label>
									<Form.Control
										as="select"
										className="mr-sm-2 form-select"
										id="inlineFormCustomSelect"
										name="topic"
										custom
									>
										<option value="">Topic</option>
										<option value="javascript">JavaScript</option>
										<option value="node">NodeJS</option>
										<option value="react">ReactJS</option>
									</Form.Control>
								</Col>
								<Col xs="auto" className="my-1">
									<Form.Label
										className="mr-sm-2"
										htmlFor="inlineFormCustomSelect"
										srOnly
									>
										Preference
									</Form.Label>
									<Form.Control
										as="select"
										className="mr-sm-2 form-select"
										id="inlineFormCustomSelect"
										name="difficulty"
										custom
									>
										<option value="">Difficulty</option>
										<option value="beginner">Still Fresh</option>
										<option value="intermidate">Joniur Developer</option>
										<option value="advance">Senior Developer</option>
									</Form.Control>
								</Col>

								<Col xs="auto" className="my-1">
									<Button variant="outline-dark" type="submit">
										Get your Questions
									</Button>
								</Col>
							</Form.Row>
						</Form>
						<If condition={state.questions.length}>
							<Then>
								<div className="question-container">
									{questions.map((question) => (
										<div key={question.id} className="question">
											<Question Question={question} />
										</div>
									))}
								</div>
							</Then>
						</If>
					</Then>
					<Else>{handleLogin}</Else>
				</If>
				<ToastContainer />
			</div>
		</React.Fragment>
	);
};

export default Questions;
