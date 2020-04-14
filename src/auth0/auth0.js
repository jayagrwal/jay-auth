const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const auth0 = {};
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://jay-auth.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'https://jay-auth.auth0.com/api/v2/',
    issuer: `https://jay-auth.auth0.com/`,
    algorithms: ['RS256']
  });