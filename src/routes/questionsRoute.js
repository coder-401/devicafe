'use strict';

const express = require('express');
const router = express.Router();

const { getQuestions } = require('./../controller/questionsController');

router.get('/questions', getQuestions);

module.exports = router;
