import React from 'react';

const Question = ({ Question }) => {
	const { question, answer, difficulty, category } = Question;

	return (
		<div>
			<p>question: {question}</p>
			<p>answer: {answer}</p>
			<p>difficulty: {difficulty}</p>
			<p>category: {category}</p>
		</div>
	);
};

export default Question;
