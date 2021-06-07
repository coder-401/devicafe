import React from 'react';

const Question = ({ Question }) => {
	const { question, answer, difficulty, category } = Question;

	return (
		<div>
			<p className="qu">{question}</p>
			<p className="answer">{answer}</p>
			<p className="category">{category}</p>
			<p className="difficulty">{difficulty}</p>
		</div>
	);
};

export default Question;
