const mongoose = require('mongoose');


const suscriber = new mongoose.Schema({
    userid:{
        type:String
    },
    suscriber:{
        type:Number
    },
    country:{
        type:String
    },
});

const subscriber = mongoose.model("subscribers",suscriber);

module.exports = subscriber;

