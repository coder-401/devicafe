import React from 'react';
import { Card, Badge, Button, Accordion } from 'react-bootstrap';
import './question.css';

const Question = ({ Question }) => {
	const { question, answer, difficulty, category } = Question;

	const getBadge = (difficulty, category) => {
		let variant = '';
		switch (difficulty) {
			case 'beginner':
				variant = 'success';
				break;
			case 'intermidate':
				variant = 'secondary';
				break;
			case 'advance':
				variant = 'danger';
				break;
			default:
				break;
		}
		return (
			<React.Fragment>
				<Badge variant={variant}>{difficulty}</Badge>{' '}
				<Badge variant="secondary">{category}</Badge>{' '}
			</React.Fragment>
		);
	};
	return (
		<div className="question">
			<Card className="card">
				<Card.Header className="question-header">
					{getBadge(difficulty, category)}
				</Card.Header>
				<Card.Body>
					<Card.Title className="question-title">{question}</Card.Title>
					<Accordion>
						<Accordion.Toggle
							className="show-answer"
							as={Button}
							variant="link"
							eventKey="0"
						>
							View Answer
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body className="answer">{answer}</Card.Body>
						</Accordion.Collapse>
					</Accordion>
				</Card.Body>
			</Card>
		</div>
	);
};

export default Question;
