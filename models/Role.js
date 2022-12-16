const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaRole = new Schema({
    name: String
})

module.exports = mongoose.model('Role', schemaRole);