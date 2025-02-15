const express = require("express");
const connectdb = require("./config/Database");
const app = express();
const User = require("./Model/User");


app.post('/signup',async(req,res)=>
{
    const user = new User({
        FirstName:"prashant",
        LastName:"kishor",
        Age:23,
        Email:"prashant@gmail.com",
        Password:"123456",
        Gender:"Male",
    });

    try{
        await user.save();
    res.send("User Created Successfully");
    }
    catch(err){
        res.status(400).send("User Error");
    }
    
})

connectdb().then(()=>
    {
        console.log("Database Connected Successfully");
        app.listen(8090 ,()=>
            {
                console.log("Your Server is Ready..... ");
            });

            
    }).catch(err=>{
        console.log("Database  is not connected");
    });


