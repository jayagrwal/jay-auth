"use strict";


module.exports = {
    auth : () => require('./src/auth/auth'),
    utils : () => require('./src/utils/utils'),
    user : () => require('./src/models/user')
}