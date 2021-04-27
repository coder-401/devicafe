"use strict";

const fs = require("fs");
const questions = JSON.parse(fs.readFileSync("questions.json").toString());
const Collection = require("./../database/controller/data-collection");

const usermodel = require("./../database/models/user");
const questionModel = require("./../database/models/question");
const favQuestion = require("./../database/models/favQuestion");



const collectionUser = new Collection(usermodel);
const collectionQuestion = new Collection(questionModel);
const collectionFavQuestion = new Collection(favQuestion);

const getQuestions = async (req, res) => {
  try {
    let userId = req.params.id;
    let type = req.query.type;
    let difficulty = req.query.difficulty;
    let newQuestions;

    let User = await collectionUser.get(userId);
    let userRole = User.role;

    let questionFromDB = await collectionQuestion.get();

    if (type && difficulty) {
      if (type !== "none" && difficulty !== "none") {
        newQuestions = questions.filter((question) => {
          return (
            question.category === type && question.difficulty === difficulty
          );
        });
      } else if (type !== "none") {
        newQuestions = questions.filter((question) => {
          return question.category === type;
        });
      } else if (difficulty !== "none") {
        newQuestions = questions.filter((question) => {
          return question.difficulty === difficulty;
        });
      } else {
        newQuestions = questions;
      }
      res.render("questions", {
        questions: newQuestions,
        userId,
        userRole,
        questionFromDB,
      });
    } else {
      res.render("questions", { questions, userId, userRole, questionFromDB });
    }
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};
const addQuestion = async (req, res) => {
  let userId = req.params.id;
  let { question, answer, difficulty, category } = req.body;
  let record = {
    question,
    answer,
    difficulty,
    category,
  };

  const newQ = await collectionQuestion.create(record);
  res.redirect(`/questions/${userId}`);
};
  const addToFavQuestion = async (req, res) => {
	let userId = req.params.id;

	let {question,answer,QuesId} = req.body;
	let record = {
		question,
		answer
	}

	const findQues = await collectionFavQuestion.get(QuesId);

	if(!findQues){
		await collectionFavQuestion.create(record);
	}
    res.redirect(`/questions/${userId}`)
};
module.exports = {
  getQuestions,
  addQuestion,
  addToFavQuestion,
};
