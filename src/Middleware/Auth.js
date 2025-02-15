const AdminAuth = (req,res,next)=>
{
    console.log("Admin Authorizing is Getting Checking");
    const token = "xyz";
    const isauthorised = token == "xyzw";
    if(!isauthorised)
    {
        res.status(401).send("UnAuthorised Token ");
    }
    else
    {
        next();
    }
}

const UserAuth = (req,res,next)=>
    {
        console.log("Admin Authorizing is Getting Checking");
        const token = "xyz";
        const isauthorised = token == "xywz";
        if(!isauthorised)
        {
            res.status(401).send("UnAuthorised Token ");
        }
        else
        {
            next();
        }
    }

module.exports = {
    AdminAuth,UserAuth
}