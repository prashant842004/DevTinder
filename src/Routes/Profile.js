const express = require("express");
const ProfileRouter  = express.Router();
const {UserAuth} = require("../Middleware/Auth");
const {validationEditProfileData} = require("../utils/Validations");


ProfileRouter.get("/Profile/View",UserAuth,async (req,res) => {

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


ProfileRouter.patch("/Profile/Edit",UserAuth, async (req,res) =>{
try{
    if(!validationEditProfileData){
        throw new Error("Invalid User");
    }

    const loggedInUser = req.user ;
    
    Object.keys(req.body).forEach((key)=>(loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
        message :`${loggedInUser.FirstName}, Your Profile Updated Successfully`,
        data: loggedInUser,
    });
}
catch(err)
{
    res.status(404).send(err.message);
}
})


ProfileRouter.patch("/ForgatPassword",UserAuth,async (req,res) =>
{
    try{
        if(!UserForgetData){
            throw new Error("Invalid User");
        }
         const User = req.user;

         if(!req.body.Password)
       {  
        throw new Error("Password is not there ")
    }
    else{
        User.Password = req.body.Password;
    }
         await User.save();

         res.json({
            message :`${User.FirstName}, Your Password Updated Successfully`,
            data: User,
        });
    }
        catch(err)
        {
            res.status(404).send(err.message)
        }

//  res.send(user);

});
module.exports = ProfileRouter;