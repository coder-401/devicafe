'use strict';

const express = require('express');
const router = express.Router();

const { getQuestions } = require('./../controller/questionsController');

const bearerAuth = require('./../auth/middleware/bearer');

router.get('/questions', bearerAuth, getQuestions);

module.exports = router;
