'use strict';

const mongoose= require('mongoose');
const Schema= mongoose.Schema;

let FavQuestions= new Schema({
    question: {type:String, required:true},
    answer:{type:String},
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
});


module.exports= mongoose.model('fav',FavQuestions);