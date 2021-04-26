'use strict';

const fs = require('fs');
const questions = JSON.parse(fs.readFileSync('questions.json').toString());

const User = require('./../../database/models/user');

const signUpHandler = async (req, res, next) => {
	try {
		let user = new User(req.body);
		const userRecord = await user.save();
		const output = {
			user: userRecord,
			token: userRecord.token,
		};

		// res.status(201).json(output);
		res.render(`/${user.user._id}`);
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

		// res.status(200).json(user);
		// res.redirect(`/${user.user._id}`);
		res.redirect(`categories/${user.user._id}`);
	} catch (e) {
		res.status(403).json({ error: e.message });
	}
};

const profileHandler = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id);
		res.status(200).json(user);
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



const {OAuth2Client}=require('google-auth-library');
const dotenv= require('dotenv');
dotenv.config();

const googleOauthHandler = async (req,res)=>{
	let token= req.body.token;
	console.log(token);

	const client= new OAuth2Client(process.env.ClientIDGoogle);

	async function verify(){
    const ticket= await client.verifyIdToken({
        idToken:token,
        audience:process.env.ClientIDGoogle
    });
    const payload= ticket.getPayload();
    const password= payload['sub'];
	let username= payload['email'].split('@')[0];
	let email=payload['email'];
	let role='user';

	let user = {
		username:username,
		email:email,
		role:role,
		password:password

	}
	const inDB=await User.find({username:username});

	if(!inDB.length){
		let newUser= new User(user);
		const userRecord= await newUser.save();
		console.log(userRecord);
		res.redirect(`categories/${userRecord._id}`);
	}

	}

	verify().catch(console.error);

}

module.exports = {
	signUpHandler,
	signInHandler,
	profileHandler,
	questionsHandler,
	googleOauthHandler
};
