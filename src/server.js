'use strict';

const express= require('express');
const app=express();
const cors= require('cors');
const morgan=require('morgan');
const 

const errorHandler=require('./error-handler/500');
const notFound=require('./error-handler/404');
const routes=require('./routes/routes');


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(routes);

app.use('*',notFound);
app.use(errorHandler);


module.exports={

}

