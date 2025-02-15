const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    FirstName:{
        type:String
    },
    LastName:{
        type:String
    },
    Age:{
        type:Number
    },
    Email:{
        type:String
    },
    Password:{
        type:String
    },
    Gender:{
        type:String
    },
 });

 const userModel = mongoose.model('User',UserSchema);
 module.exports = userModel;

//                 OR 

//  module.exports = mongoose.model('User', UserSchema);