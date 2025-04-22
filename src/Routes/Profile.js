const express = require("express");
const ProfileRouter  = express.Router();
const {UserAuth} = require("../Middleware/Auth");


ProfileRouter.get("/Profile",UserAuth,async (req,res) => {

    try{
     
        const user = req.user;
   
   if(!user){
    throw new Error("Error Does not Exist");
   }

   res.send(user)
    // res.send("Reading cookies");
    }
    catch(err)
    {
        res.status(400).send(" Error : " + err.message);
    }
})

module.exports = ProfileRouter;