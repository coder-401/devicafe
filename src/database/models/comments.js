'use strict';

const mongoose= require('mongoose');
const Schema= mongoose.Schema;

let Comments= new Schema({
    description: {type:String, required:true},
    post:{
        type:Schema.Types.ObjectId,
        ref:'posts'
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    time:{type:String,default:Date.now().toString()}
});


module.exports= mongoose.model('comments',Comments);