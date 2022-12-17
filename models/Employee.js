const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaEmp = new Schema({
    fistName: {
        type: String,
        required: true   
    },
    lastName:{
        type: String,
        required: true   
    },
    email: { 
            type: String,
            required: true,
            unique: true
        },
    role: {
        type: String,
        required: true   
    },
    sin: {
        type: String,
        required: true   
    },
    dob: {
        type: String,
        required: true   
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    image:{ 
        type: String,
        Default: ''
    },
  /*   localisation: {
        type: mongoose.types.ObjectId,
        default: '',
        ref: 'Localisation'             
    },
    department: {
        type: mongoose.types.ObjectId,
        ref: 'Dept' 
    }
    */
})

module.exports = mongoose.model('Emp', schemaEmp);