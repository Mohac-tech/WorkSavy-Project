
const jwt = require("jsonwebtoken")
require('dotenv').config();

 function accesToken(user) { return jwt.sign(user, process.env.ACCES_TOKEN, {expiresIn: '30m'}) }
 function accesRefresh(user) { return jwt.sign(user, process.env.ACCES_REFRESH_TOKEN, {expiresIn: '1y'}) }

 module.exports = {
   accesToken,
   accesRefresh
}
