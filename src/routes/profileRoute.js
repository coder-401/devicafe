'use strict';

const express = require('express');
const router = express.Router();

const {
	updateProfile,
	getProfile,
} = require('./../controller/profileController');

const bearerAuth = require('./../auth/middleware/bearer');

router.put('/profile/:id', bearerAuth, updateProfile);
router.get('/profile/:id', bearerAuth, getProfile);
router.get('/profile',(req,res)=>{
	throw Error()
})
module.exports = router;
