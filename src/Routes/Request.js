const express = require("express");
const RequestRouter = express.Router();
const {UserAuth} = require("../Middleware/Auth");



RequestRouter.post("/SendConnectionRequest",UserAuth,(req,res)=>
    {
        const user = req.user;
    
        res.send("request sent by : "+user.FirstName +" " +user.LastName);
        console.log("Connection request is sent");
    
        // res.send("connection sent Successfully");
    });  

    module.exports =  RequestRouter;
    