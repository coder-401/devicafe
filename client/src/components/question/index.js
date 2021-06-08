import React, { useState } from "react";
import { If, Then } from "react-if";
import { Card, Badge, Button } from "react-bootstrap";
import "./question.css";

const Question = ({ Question }) => {
  const { question, answer, difficulty, category } = Question;
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };
  const getBadge = (difficulty) => {
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
    return <Badge variant={"variant"}>{difficulty}</Badge>;
  };
  return (
    <div className="question">
      <Card>
        <Card.Header>{getBadge(difficulty)}</Card.Header>
        <Card.Body>
          <Card.Title>{question}</Card.Title>
          <Card.Text>{answer}</Card.Text>
          <Button variant="primary">answer</Button>
        </Card.Body>
      </Card>
      {/* <p className="qu">{question}</p>
      <div onClick={handleShow} style={{ cursor: "pointer" }}>
        Show Answer
      </div>
      <If condition={show}>
        <Then>
          <p className="answer">{answer}</p>
        </Then>
      </If>
      <p className="category">{category}</p>
      <p className="difficulty">{difficulty}</p> */}
    </div>
  );
};

export default Question;
