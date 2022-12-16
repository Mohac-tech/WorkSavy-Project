const mongoose = require('mongoose')
const { Schema } = mongoose

const schemaLocalisation = new Schema({
    name: String
})

 module.exports = mongoose.model('Localisation', schemaLocalisation);