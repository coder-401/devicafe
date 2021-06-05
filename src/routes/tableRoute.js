'use strict';

const express = require('express');
const router = express.Router();

const { getTable, createTable } = require('../controller/tableController');

const bearerAuth = require('../auth/middleware/bearer');

router.get('/table/:id', bearerAuth, getTable);
router.post('/table', bearerAuth, createTable);

module.exports = router;
