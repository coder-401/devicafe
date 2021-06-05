import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { If, Then } from 'react-if';
import axios from 'axios';
import Question from './../question';

import { getQuestion } from './../../reducers/questions';

const Questions = () => {
	const dispatch = useDispatch();

	const state = useSelector((state) => {
		return {
			questions: state.questions.questions,
			token: state.signIn.token,
		};
	});

	useEffect(async () => {
		const response = await axios.get('http://localhost:5000/questions');

		dispatch(getQuestion(response.data));
	}, []);

	return (
		<If condition={state.questions.length}>
			<Then>
				{state.questions.map((question) => (
					<div key={question.id}>
						<hr />
						<Question Question={question} />
						<hr />
					</div>
				))}
			</Then>
		</If>
	);
};

export default Questions;
