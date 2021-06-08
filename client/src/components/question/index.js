import React, { useState } from "react";
import { If, Then } from "react-if";
import { Card, Badge, Button, Accordion } from "react-bootstrap";
import "./question.css";

const Question = ({ Question }) => {
  const { question, answer, difficulty, category } = Question;

  const getBadge = (difficulty, category) => {
    //
    // <Badge variant="success">Success</Badge>{' '}
    // <Badge variant="danger">Danger</Badge>{' '}
    let variant = "";
    switch (difficulty) {
      case "beginner":
        variant = "success";
        break;
      case "intermidate":
        variant = "secondary";
        break;
      case "advance":
        variant = "danger";
        break;
    }
    return (
      <React.Fragment>
        <Badge variant={variant}>{difficulty}</Badge>{" "}
        <Badge variant="secondary">{category}</Badge>{" "}
      </React.Fragment>
    );
  };
  return (
    <div className="question">
      <Card>
        <Card.Header>{getBadge(difficulty, category)}</Card.Header>
        <Card.Body>
          <Card.Title>{question}</Card.Title>
          <Accordion>
            <Accordion.Toggle className="show-answer" as={Button} variant="secondary" eventKey="0">
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
