const express = require("express");
const RequestRouter = express.Router();
const {UserAuth} = require("../Middleware/Auth");
const ConnectionRequest = require("../Model/ConnectionRequest");
const User = require("../Model/User");



RequestRouter.post("/request/send/:status/:toUserId",UserAuth,async (req,res)=>
{
   
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const IsAllowedStatus = ["ignored","interested"];
        if(!IsAllowedStatus.includes(status))
        {
            return res
            .status(400)
            .json({
                message: " Invalid Status Type : " + status ,
                data,});
        }

        const toUser = await User.findById(toUserId);
        if(!toUser)
        {
            return res.status(404)
            .json({message : " User Not Found......!!!!"})
        }

        const ExistingConnectionRequest = await ConnectionRequest.findOne({
            $or :[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId},
            ],
        });

        if(ExistingConnectionRequest){
            return res
            .status(400)
            .send({message : "Connection Request Already Exists....!!"})
        }

        const connectionRequest =  new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });
        const data = await connectionRequest.save();
        res.json({
            message: req.user.FirstName + " is " + status + " in " + toUser.FirstName ,
            data,
        })
    }
    catch(err)
    {
        res.status(400).send(err.message);
    }
   
});




RequestRouter.post("/SendConnectionRequest",UserAuth,(req,res)=>
    {
        const user = req.user;
    
        res.send("request sent by : "+user.FirstName +" " +user.LastName);
        console.log("Connection request is sent");
    
        // res.send("connection sent Successfully");
    });  



    module.exports =  RequestRouter;
    