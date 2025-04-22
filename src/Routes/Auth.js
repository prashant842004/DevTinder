const express = require("express");
const AuthRouter = express.Router();
const {validateSignUpData} = require("../utils/Validations");
const bcrypt = require("bcrypt");
const User = require("../Model/User");

AuthRouter.post('/signup',async(req,res)=>
    {
     try{
        // Validations of Data
        validateSignUpData(req);
    
        const {FirstName,LastName,Email,Password} = req.body;
        // Encrypt the Password
    
        const PasswordHash = await bcrypt.hash(Password,10);
        console.log(PasswordHash);
    
        // Creating new Instance of the user Model
        //  console.log(req.body);
        // const user =new User(req.body);
    
        const user =new User({
            FirstName,
            LastName,
            Email,
          
            Password: PasswordHash
        });
        
        await user.save();
        res.send("User Created Successfully");
        }
        catch(err){
            res.status(400).send("User Error"+ err.message);
        }
        
    });  

AuthRouter.post("/login",async (req,res)=>
    {
        try{
    
            const { Email , Password} = req.body;
    
            const user = await User.findOne({Email:Email});
    
            if(!user)
            {
                throw new Error("Invalid  Credentials");
            }
            const IsPasswordValid = await user.validatepassword(Password);
    
            if(IsPasswordValid)
            {
                // Create a JWT Token 
     
                const token = await user.getJWT();
    
                console.log(token);
    
                //Add the Token to cookies and send the response back to the user
    
                res.cookie("token",token,{expires: new Date(Date.now() + 900000), httpOnly: true });
    
                res.send("Login Successfully !! ");
            }
            else{
                throw new Error("Invalid  Credentials");
            }
        }
        catch(err){
            res.status(400).send(" Error : " + err.message);
        }
    })


module.exports=AuthRouter;