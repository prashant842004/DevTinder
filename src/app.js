const express = require("express");
const connectdb = require("./config/Database");
const app = express();
const User = require("./Model/User");
// const subscriber = require("./Model/suscriber");
const {validateSignUpData} = require("./utils/Validations");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {UserAuth} = require("./Middleware/Auth");



app.use(express.json());
app.use(cookieparser())

// app.get("/feed",async (req, res) => {
    
//     try{
//         const users = await User.find({});
//         res.send(users);
//     }
// catch(err)
// {
//     res.status(500).send("Server Error");

// }})

// app.delete("/user",async (req, res) => { 
    
    // try{
    //     const userid = req.body.userid;
    //     await User.findByIdAndDelete(_id = userid );

    // }
    // catch(err)
    // {
    //     res.status(500).send("Server Error");
    // }
// })

// app.get("/users",async (req, res) => {
    
//     const userid = req.body._id;
//     const user = await User.findById(_id = userid );

//         res.send('user Deleted successfully');
//     try{
//         const user = await User.find({Email: useremail});
     
//         if(user.length)
//         {
//             res.send(user);
//         }
//         else{
//             res.status(404).send("User Not Found");
//         }
//     }
//     catch(err){
//         res.status(400).send("Server Error");
//     }
// })

// app.post('/suscriber',async (req,res)=>
// {
//     const user = new User(req.body);
//     try{
//         await user.save();
//         res.send("suscriber data posted successfully")
//     }
//     catch(err){
//         res.status(400).send("User Error");
//     }

// })

// app.patch("/suscriber",async (req, res)=>
//     {
//         const userid = req.body.userid;
//         const data = req.body;
    
//         try{
//         const user = await subscriber.findByIdAndUpdate({_id:userid },data,{
//             returnDocument : "after",
//             runValidators:true
//         });
//         console.log(user)
//         res.send("user Updated Successfully");
//         }catch(err){
//             res.status(400).send(err.message);
//         }
//     });

// app.patch("/user/:userid",async (req, res)=>
// {
//     // const userid = req.body.userid;
//     const userid = req.params?.userid;
//     const data = req.body;

//     try{

//         const AllOWED_UPDATES = [
//             "PhotoUrl",
//             "Gender",
//             "Age",
//             "Skills",
//             "About"
//         ];

//         const isupdatedallowed = Object.keys(data).every((k)=>
//         AllOWED_UPDATES.includes(k)
//     );
//     if(!isupdatedallowed)
//     {
//         throw new Error("Updates not Allowed")
//     }
//     if(data?.Skills.length > 10)
//     {
//         throw new Error("Skills Cannot be More Than 10")
//     }
//     const user = await User.findByIdAndUpdate({_id:userid },data,{
//         returnDocument : "after",
//         runValidators:true
//     });
//     console.log(user)
//     res.send("user Updated Successfully");
//     }catch(err){
//         res.status(400).send( err.message);
//     }
// });


app.post('/signup',async(req,res)=>
{
 try{
    // Validations of Data
    validateSignUpData(req);

    const {FirstName,LastName,Email,Password,About,Skills,} = req.body;
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
        About,
        Skills,
        Password: PasswordHash
    });
    
    await user.save();
    res.send("User Created Successfully");
    }
    catch(err){
        res.status(400).send("User Error"+ err.message);
    }
    
});  

app.post("/login",async (req,res)=>
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

app.get("/Profile",UserAuth,async (req,res) => {

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


app.post("/SendConnectionRequest",UserAuth,(req,res)=>
{
    const user = req.user;

    res.send("request sent by : "+user.FirstName +" " +user.LastName);
    console.log("Connection request is sent");

    // res.send("connection sent Successfully");
});
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


