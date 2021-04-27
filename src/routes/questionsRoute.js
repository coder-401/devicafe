"use strict";

const express = require("express");
const router = express.Router();

const {
  getQuestions,
  addQuestion,
  addToFavQuestion,
} = require("./../controller/questionsController");

const bearerAuth = require("./../auth/middleware/bearer");

router.get("/questions/:id", bearerAuth, getQuestions);
router.post("/addquestion/:id", bearerAuth, addQuestion);
router.post("/addToFavQuestion/:id", bearerAuth, addToFavQuestion);

module.exports = router;
