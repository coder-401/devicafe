'use strict';

const fs = require('fs');
const questions = JSON.parse(fs.readFileSync('questions.json').toString());

const User = require('./../../database/models/user');

const collection = require('./../../database/controller/data-collection');

const userCollection = new collection(User);

const signUpHandler = async (req, res, next) => {
	try {
		let user = new User(req.body);
		const userRecord = await user.save();
		const output = {
			user: userRecord,
			token: userRecord.token,
		};

		// res.status(201).json(output);
		res.render(`/`);
	} catch (e) {
		res.status(403).json({ error: e.message });
	}
};

const signInHandler = (req, res, next) => {
	try {
		const user = {
			user: req.user,
			token: req.user.token,
		};

		res.cookie('access_token', user.token, {
			maxAge: 360000000,
			httpOnly: true,
		});

		res.redirect(`categories/${user.user._id}`);
	} catch (e) {
		res.status(403).json({ error: e.message });
	}
};

const profileHandler = async (req, res, next) => {
	try {
		const id = req.params.id;
		const user = await userCollection.get(id);
		res.render('profile', { user });
	} catch (e) {
		res.status(403).json({ error: e.message });
	}
};

const questionsHandler=  (req,res,next)=>{
	try {
		let userId = req.params.id
		let type = req.query.type
		let difficulty = req.query.difficulty
		let newQuestions

		
		if(type && difficulty) {

			if(type !== "none" && difficulty  !== "none") {
				 newQuestions = questions.filter(question => {
					return (question.category === type && question.difficulty === difficulty)
				})
				
			} else if(type  !== "none") {
				 newQuestions = questions.filter(question => {
					return question.category === type 
				})
				
			} else if(difficulty  !== "none") {
				 newQuestions = questions.filter(question => {
					return question.difficulty === difficulty 
				})
				
			} else {
				 newQuestions = questions
				 
			}
			res.render('questions',{questions: newQuestions,userId })
		} else {
			res.render('questions',{questions,userId })
		}

		
		
	} catch (error) {
		res.status(403).json({error:error.message});
	}
}


module.exports = {
	signUpHandler,
	signInHandler,
	profileHandler,
	questionsHandler
};
