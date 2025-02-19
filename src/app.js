const express = require("express");
const connectdb = require("./config/Database");
const app = express();
// const User = require("./Model/User");
const subscriber = require("./Model/suscriber");


// app.post('/signup',async(req,res)=>
// {
//     const user = new User({
//         FirstName:"samiksha ",
//         LastName:"khobre",
//         Age:23,
//         Email:"khobre@gmail.com",
//         Password:"123456",
//         Gender:"female",
//     });

//     try{
//         await user.save();
//     res.send("User Created Successfully");
//     }
//     catch(err){
//         res.status(400).send("User Error");
//     }
    
// })    

app.post('/suscriber',async (req,res)=>
{
    const sub = new subscriber({
        country:"United States",
        userid:"5467389",
        suscriber:5237

    });
    try{
        await sub.save();
        res.send("suscriber data posted successfully")
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


