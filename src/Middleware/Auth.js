
const jwt = require("jsonwebtoken");
const User  = require("../Model/User");

// const AdminAuth = (req,res,next)=>
// {
//     console.log("Admin Authorizing is Getting Checking");
//     const token = "xyz";
//     const isauthorised = token == "xyzw";
//     if(!isauthorised)
//     {
//         res.status(401).send("UnAuthorised Token ");
//     }
//     else
//     {
//         next();
//     }
// }

// const UserAuth = (req,res,next)=>
//     {
//         console.log("Admin Authorizing is Getting Checking");
//         const token = "xyz";
//         const isauthorised = token == "xywz";
//         if(!isauthorised)
//         {
//             res.status(401).send("UnAuthorised Token ");
//         }
//         else
//         {
//             next();
//         }
//     }


const UserAuth = async (req,res,next)=>
    {
      try{  //Read the token from Request cookies 
        
        const {token} = req.cookies;

        if(!token)
        {
            throw new Error("Token is not Valid !!!");
        }
         // Validate the token
        const decoded = await jwt.verify(token,"DEV@TINDER@20");

        const {_id} = decoded;
         // Find the user
        const user = await User.findById(_id);

        if(!user)
        {
            throw new Error("User is not found");
        }
        req.user=user;
        next();
    }
        catch(err)
        {
                res.status(400).send(" Error : " + err.message);
        }   
    };


module.exports = {
    UserAuth
}