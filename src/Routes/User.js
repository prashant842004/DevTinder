const express = require("express");
const UserRouter = express.Router();

const USER_SAFE_DATA = "FirstName LastName PhotoUrl Age Gender About Skills";

const {UserAuth} = require("../Middleware/Auth");
const ConnectionRequest  = require("../Model/ConnectionRequest");

const User = require("../Model/User")

UserRouter.get("/user/requests/Received",UserAuth,async (req,res) =>
{
    try{
        const loggedInUser = req.user;
        
        const connectionRequests = await ConnectionRequest.find({
            toUserId : loggedInUser._id,

        }).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);

        // }).populate("fromUserId",["FirstName","LastName"]);

        res.json({
            message: "Data fetched successfully",
            data : connectionRequests,
        });
    }
    catch(err)
    {
        req.statusCode(400).send("ERROR : " + err.message);
    }
});


UserRouter.get("/user/connection",UserAuth,async (req,res) =>
    {
        try{
            const loggedInUser = req.user;

            const connectionRequests = await ConnectionRequest.find({
                $or : [
                    {toUserId : loggedInUser._id ,status : "accepted"},
                    {fromUserId : loggedInUser._id ,status : "accepted"},
                ],
            }).populate("fromUserId",USER_SAFE_DATA)
            .populate("toUserId",USER_SAFE_DATA);
            
            const data  = connectionRequests.map((row) => {
                
                if(row.fromUserId._id.toString() === loggedInUser._id.toString())
                {
                    return row.toUserId;
                }
                    return row.fromUserId;
            });

            res.json({
                data 
            })
           
        }
        catch(err)
        {
            res.status(400).send("ERROR : " + err.message);
        }
    });

UserRouter.get("/user/feed",UserAuth, async (req,res)=>
{
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page-1)*limit;

        const connectionRequests = await ConnectionRequest.find({
            $or : [
                { fromUserId : loggedInUser._id},
                { toUserId : loggedInUser._id}
        ]
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();

        connectionRequests.forEach((req )=>
        {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });
            const users = await User.find({
                $and : [ { _id : {$nin : Array.from(hideUsersFromFeed)}},
                    {_id : {$ne : loggedInUser._id}},
                  
                ],
            }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        
        res.send(users);
    } catch (err) {
        res.status(400).json({message : err.message })
    }
})

module.exports = UserRouter;