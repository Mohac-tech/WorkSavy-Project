const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaUser = new Schema({
    fistName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        Default: ''
    },
    role: String,
    passwordHash: {
        type: String,
        required: true
    },
    dob: String,
    /*   localisation: {
          type: mongoose.types.ObjectId,
          ref: 'Localisation'             
      },
      department: {
          type: mongoose.types.ObjectId,
          ref: 'Dept' 
      }
      */
})

module.exports = mongoose.model('User', schemaUser);