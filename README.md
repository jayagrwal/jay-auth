
# jay-auth
[Node.js](http://nodejs.org/) package for basic and JWT based Authentication & Authorization with Password encryption & comparsion

## Installation

Via [npm](http://npmjs.org/):

```bash
$ npm install jay-auth
```    

## Basic example
```javascript
// You can use this package with your login apis
// Authentication module.
const jauth = require("jay-auth");
const utils = jauth.utils();
const auth = jauth.auth();
const refreshTokens = {};

//Lets consider there is a "/signup" post method
//You can use your desired framework for routing
function signUpRoute(userEmail, userPassword) {
  //you can send the validated email and password in the request body
  //then check in your DB if the userEmail is unique for signUp
  if (userEmailIsPresent) {
    //you can send response with status code 409
    //with json {message:  'Mail exists'}
  } else {
    //use the methods as Promises
    //use .catch() method after .then() method for error handling
    //use utils.creatHash() method to encrypt the passwords
    utils.createHash(userPassword, hashRounds).then((hash) => {
      //console.log(hash)
      //write the the user in your DB
      //send the response as status code 201
      //with json {'User created'}
    }).catch((err) => {
      //console.log(err);
      //send the response as status code 500
      //with json {error: err}
    });
  }
}
////Then you have a "/login" post method
function loginRoute(userEmail, userPassword) {
  //you can send the validated email and password in the request body
  //then check in your DB if the userEmail is present for Login
  if (emailIsNotPresent) {
    //send the response as status code 401
    //with json {message:'Auth failed'}
  } else {
    //use utils.compare() method to compare passwords
    utils.compare(userPassword, fetchedUserPassword).then((result) => {
      //result = true || false;
      if (!result) {
        //send the response as status code 401
        //with json {message:'Auth failed'}
      } else {
        let userObject = {
          email: fetchedUserEmail, // user Email
          userId: fetchedUserId, //some unique id
          isAdmin: fetchedUserIsAdmin //bool value
        }
        let expireTimeObj = {
          expiresIn: "1h"
        }
        //use auth.createToken() method to create JWT tokens
        //consider your jwtKey is string "secret"
        auth.createToken(userObject, jwtKey, expireTimeObj).then((result) => {
          //console.log(result)
          //use auth.getRefreshToken() which is synchronous
          let token = {
            token: result,
            refreshToken: auth.getRefreshToken()
          }
          //I am maintaining a local object here but you can create a
          //seperate collection for mainting refreshtokens for their 
          //respective email
          refreshTokens[`${user[0].email}`] = token.refreshToken;
          //send the response as status code 200
          //with json {message:  'Auth sucessful',...token}
        }).catch((err) => {
          //console.log(err)
          //send the response as status code 401
          //with json {message:  'Auth failed'}
        });

      }
    }).catch((err) => {
      //console.log(err)
      //send the response as status code 401
      //with json {message:  'Auth failed'}
    });

  }
}

//Now you will need a middleware to verify the user and send the new token
function verifyUserMiddleware(jwtToken, _refreshToken) {
  //use auth.verifyToken() to verify your JWT token
  auth.verifyToken(jwtToken, jwtKey).then((decoded) => {
      //console.log(decode);
      //result will be the decoded object
      // do validate the result
      if (!decoded) {
        //send the response as status code 401
        //with json {message:  'Auth failed'}
      }
      //check if decoded object's email key matches in your collection
      //and the refresh token sent in request body is present in your     		
      //collection
      if ((`${decoded.email}` in refreshTokens) && (refreshTokens[`${decoded.email}`] == refreshToken)) {
        //delete the extra keys which were added by jwt
        //so we get our user Object again
        decoded.iat && delete decoded.iat;
        decoded.exp && delete decoded.exp;
        //we create a new jwt to token to send in response
        //consider your jwtKey is string "secret"
        let expireTimeObj = {
          expiresIn: "1h"
        }
        auth.createToken(decoded, jwtKey, expireTimeObj).then((token) => {
            if (!token) {
              //send the response as status code 401
              //with json {message:  'Auth failed'}
            } else {
              let newToken = token;
              //send the response as status code 401
              //with json {
              //message:  'Verification Success'
              //token: newToken,
              //refreshToken: _refreshToken (from params) 
            }
          }
        }).catch((err) => {
        //console.log(err);
        //send the response as status code 500
        //with json {error:err}
      })
    }
  });
}

```



## Requirements

 - **[Node.js](http://nodejs.org)** - Event-driven I/O server-side JavaScript environment based on V8.
 - **[npm](http://npmjs.org)** - Package manager. Installs, publishes and manages node programs.


## Dependencies

 - **[ jsonwebtoken]([https://github.com/auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken))** - This was developed against `draft-ietf-oauth-json-web-token-08`. It makes use of [node-jws](https://github.com/brianloveswords/node-jws)
 - **[bcrypt.js](https://github.com/dcodeIO/bcrypt.js)** - Optimized bcrypt in plain JavaScript with zero dependencies.
- **[rand-token]((https://github.com/sehrope/node-rand-token))** - Generate random tokens from your choice of randomness.
