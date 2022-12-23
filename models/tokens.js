const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaToken = new Schema({
    token: String,
    refreshToken: String
})

module.exports = mongoose.model('Token', schemaToken);