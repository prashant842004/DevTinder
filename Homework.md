//  Episode-08 _ Data Sanitization & Schema Validations  // first  48 sec

- Explore the schema type options from the documention
- add required ,  unique , lowercase, uppercase, min, minlength , trim
- Create the custom validate Function for gender 
- improve the DB schema  - PUT all appropriate validations on each field in Schema 
- Add timeStamps to the UserSchema
- Add API Level Validation on Patch request & Singup Post API
- Data Sanitizing  - Add API Validation For Fields.
- install npm validator.
- Explore validator library Function and use validator function for password, Email , PhotoUrl.
- Never trust req.body

// Encrypting the Passwords

- Validate the data in SignUp API
- Install bcrypt Package
- Create PasswordHash using bcrypt.hash & save hte user is excrupted password
- Create Login API.
- Compare Password and throw errors if email or password is invalid.

// Authentication JWT  cookies 

- Install cookies-parser.
- Just send a dummy cookies to the user.
- Create GET /Profile API and check if you get the cookies back.
- In Login API After email and password validation create a jwt token and send it tp user in  cookies.
- Read the cookies inside your profile API and find the logged in user.

- UserAUth middleware.
- Add the userAuth middleware in Profile API and a new ConnectionRequest API.
- Set the Expiry of JWT token and cookies to 7 Days.
- Create UserSchema Methods to getJWT();
- Create UserSchema Methods to  comparePassword(PasswordInputByUser).

- Explore Tinder APIs.
- Create a List of All Apis you can think of an DEV Tinder
- Groups Multiple Routes Under Respective Routers.
- Read Documenatation  For Express. Router 
- Create Routers Folder for managing Auth , Profile , And Request Router
- Create AuthRouter, ProfileRouter ,RequestRouter
- Import this routers un app.js
- Create POST/logout API 
- Create PATCH /profile/edit 
- Create patch/profile /password API  => forgat password API
- Make you validate all data in every POST ,PATCH APIS


