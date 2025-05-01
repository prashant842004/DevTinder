# DevTinder APIs

## Auth Router
- POST / signup
- POST / login
- POST / logout

## Profile Router
- GET / profile / view 
- PATCH / profile / edit
- PATCH / profile /password

## Connection RequestRouter
- POST /request/send/interseted/:userid
- POST /request/send/ignored/:userid
- POST /request/review/accepted/:requestID
- POST /request/review/rejected/:requestID

## User Router
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the Profiles of other users on platform


Status : ignore , interested , accepted , rejected

