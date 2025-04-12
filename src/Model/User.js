const mongoose = require('mongoose');
const validator  = require('validator')


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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address " + value);
            }
        }
    },
    Password:{
        type:String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password  " + value);
            }
        }
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
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo Url  " + value);
            }
        }
       
   },
    Skills:[String]
 },{
    timestamps:true
 });

 const userModel = mongoose.model('User',UserSchema);
 module.exports = userModel;

//                 OR 

//  module.exports = mongoose.model('User', UserSchema);