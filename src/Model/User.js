const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
        minLength: 4,
        maxLength: 30,
    },
    LastName:{
        type:String,
    },
    Age:{
        type:Number,
        lowercase:true,
        min: 18,
        max: 50,
    },
    Email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    Password:{
        type:String
    },
    Gender:{
        type:String,
        validate(value){
            if(!["male", "female","others"].includes(value))
            {
                throw new Error("Gender data is not valid");
            }
        }

    },
    About:{
        type:String,
        default:"not mention any information"
    },
    PhotoUrl:
    {
        type:String,
        

    },
    Skills:[String]
 });

 const userModel = mongoose.model('User',UserSchema);
 module.exports = userModel;

//                 OR 

//  module.exports = mongoose.model('User', UserSchema);