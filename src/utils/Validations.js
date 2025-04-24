const validator = require("validator");

const validateSignUpData = (req) =>
{
    const {FirstName,LastName,Email,Password} = req.body;

    if(!FirstName || !LastName)
    {
        throw new Error(" Name is Not Valid !!");
    }
    else if(!validator.isEmail(Email)){
        throw new Error("Email is Not Valid !!");
    }
    else if(!validator.isStrongPassword(Password)){
        throw new Error("Please Enter a Strong Password");
    }
};

const validationEditProfileData = (req) =>{
    const IsAllowedUser = ["FirstName","LastName",'Gender',"Skills","Age","PhotoUrl","About"];
    const IsEditAllowed =Object.keys(req.body).every((field) => 
        IsAllowedUser.includes(field)
    );
    return IsEditAllowed;
}

const UserForgetData = (req) =>
{
    const userallowedPassword = "Password";
     const IsAllowed = Object.keys(req.body).every((field)=>(userallowedPassword.includes(field)));

     return IsAllowed;
}


module.exports = {
    validateSignUpData,validationEditProfileData
}