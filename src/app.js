const express = require("express");

const app = express();

app.get("/",(req,res) =>
{
    res.send("This Is our home Page");
});

app.get("/about",(req,res)=>
{
    res.send("This Is About Page");
})
app.listen(8090 ,()=>
{
    console.log("Your Server is Ready..... ");
});