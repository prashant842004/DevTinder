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

module.exports = {
    validateSignUpData,
}