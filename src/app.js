const express = require("express");

const app = express();

// app.get("/user/:id/:name/:password",(req,res)=>
// {
//     console.log(req.params);
//     res.send({
//         firstname: "prashant",
//         lastname: "thakre"
//     })
// })

// app.get(/.*fly$/,(req,res)=>
// {
//     res.send({
//               firstname: "prashant",
//              lastname: "thakre"
// })
// })

// app.get("/ab*c",(req,res)=>
//     {
//         res.send({
//                   firstname: "prashant",
//                  lastname: "thakre"
//     })
//     })

app.use("/home",(req,res,next) =>
{
    console.log("Middleware 1");
    // res.send("First Response");
    next();
},
(req,res,next)=>
{
    console.log("Middleware 2");
    // res.send("Second Response");
    next();
},
(req,res,next)=>
{
    console.log("Middleware 3");
    // res.send("Third Response ");
    next();
},
(req,res,next)=>{
    console.log("Middleware 4");
    // res.send("Fourth Response");
    next();
},
(req,res,next)=>
{
    console.log("Middleware 5");
    // res.send("Fifth Response");
    next();
},
(req,res,next)=>
{
    console.log("Middleware 6");
    res.send("Last Response ");
});

app.listen(8090 ,()=>
{
    console.log("Your Server is Ready..... ");
});