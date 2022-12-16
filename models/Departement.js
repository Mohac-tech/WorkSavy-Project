const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaDept = new Schema({
    name: String
})

module.exports = mongoose.model('Dept', schemaDept);