'use strict';

const express = require('express');

const router = express.Router();

const { cafeEntrance, getTable } = require('./../controller/cafeController');

const bearerAuth = require('./../auth/middleware/bearer');

router.get('/cafe/:id', bearerAuth, cafeEntrance);

router.get('/tables/:id/:tableId', bearerAuth, getTable);

module.exports = router;
