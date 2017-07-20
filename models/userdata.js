var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var user_data = new Schema({
    name:{
        type:String,
        required:true
    },
    roll:{
        type:String,
        required:true,
        unique:true
    },
    contact:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    answers:{
        type:Array
    },
    score:{
        type:Number
    }
},{collection:'users'});

module.exports = mongoose.model('users',user_data);