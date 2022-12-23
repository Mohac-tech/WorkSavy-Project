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
    localisation: {
          type: mongoose.Types.ObjectId,
          ref: 'Localisation'             
      },
    department: {
          type: mongoose.Types.ObjectId,
          ref: 'Dept' 
      }
    //  tokens: {
    //     type: Object,
    //     Default: ''
    // }
})

module.exports = mongoose.model('User', schemaUser);