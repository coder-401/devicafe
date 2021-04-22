'use strict';

const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config();
const Schema= mongoose.Schema;

let UserSchema= new Schema({
    email:{type:String, required: true, unique:true},
    username: {type:String, required: true, unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true, default:'user', enum:['user','editor','admin']},
    posts:[{
        type:Schema.Types.ObjectId,
        ref:'Posts'
    }],
    favQuestions:[{
        type: Schema.Types.ObjectId,
        ref:'fav'
    }],
    comments:[{
        type: Schema.Types.ObjectId,
        ref:'comments'
    }]
});

UserSchema.virtual('token').get(function(){
    let tokenObj={
        username:this.username
    }

    return jwt.sign(tokenObj,process.env.SECRET);
});

UserSchema.pre('save',async function(){
    let acl= {
        user: ['read'],
        editor: ['read', 'create', 'update'],
        admin: ['read', 'create', 'update', 'delete']
    };
    return acl[this.role];
});

users.statics.authenticateWithToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
      const user = this.findOne({ username: parsedToken.username })
      if (user) { return user; }
      throw new Error("User Not Found");
    } catch (err) {
      throw new Error(err.message)
    }
}

module.exports= model('User',UserSchema);