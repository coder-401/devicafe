'use strict';

const express = require('express');
const router = express.Router();

const { getCategories } = require('./../controller/categoriesController');

const bearerAuth = require('./../auth/middleware/bearer');

router.get('/categories/:id', bearerAuth, getCategories);

module.exports = router;
