const bcrypt = require('bcrypt');
const utils = {}

utils.createHash = async (password, hashRounds) => {
    return await bcrypt.hash(password, hashRounds)
}

utils.compare = async (userPassword, fetchedUserPassword, callBack) => {
    return await bcrypt.compare(userPassword, fetchedUserPassword)
}

module.exports = utils;
