'use strict';

require('dotenv').config();

// Start up DB Server
const mongoose = require('mongoose');

const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
};

mongoose
	.connect(process.env.MONGODB_URI, options)
	.then(() => {
		console.log('connected to MongoDB....');
		require('./src/server.js').start(process.env.PORT);
	})
	.catch((e) => {
		throw new Error(e.message);
	});
