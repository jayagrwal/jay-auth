const jwt = require('jsonwebtoken');
const randomToken = require('rand-token');
const auth = {};

const genTokenpromise = (userObj, jwtKey, expireTimeObj) => {
    return new Promise((resolve, reject) => {
        jwt.sign(userObj, jwtKey, expireTimeObj, (err, hash) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(hash);
            }
        });
    });
};

const verifyTokenpromise = (token, jwtKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtKey, (err, hash) => {
            if (err) {                
                reject(err);
            }
            else {
                resolve(hash);
            }
        });
    });
};

auth.getRefreshToken = () => randomToken.uid(256);

auth.createToken = async (userObj, jwtKey, expireTimeObj) => {
    return await genTokenpromise(userObj, jwtKey, expireTimeObj)
}

auth.verifyToken = async (token, jwtKey, callBack) => {
    return await verifyTokenpromise(token, jwtKey)
}

module.exports = auth;
