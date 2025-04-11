const mongoose = require('mongoose');


const suscriber = new mongoose.Schema({
    userid:{
        type:String
    },
    suscriber:{
        type:Number
    },
    country:{
        type:String,
        validate(value){
            if(!["india","usa","pakistan"].includes(value))
            {
                throw new Error("this is not a country");
            }
            else{

            }
        }
    },
});

const subscriber = mongoose.model("subscribers",suscriber);

module.exports = subscriber;

