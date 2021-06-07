import React, { useState } from 'react';
import { If, Then } from 'react-if';

const Question = ({ Question }) => {
	const { question, answer, difficulty, category } = Question;
	const [show, setShow] = useState(false);

	const handleShow = () => {
		setShow(!show);
	};

	return (
		<div>
			<p className="qu">{question}</p>
			<div onClick={handleShow} style={{ cursor: 'pointer' }}>
				Show Answer
			</div>
			<If condition={show}>
				<Then>
					<p className="answer">{answer}</p>
				</Then>
			</If>
			<p className="category">{category}</p>
			<p className="difficulty">{difficulty}</p>
		</div>
	);
};

export default Question;
