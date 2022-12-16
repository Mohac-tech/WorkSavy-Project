const mongoose = require('mongoose');
const { Schema } = mongoose;

const schemaEmp = new Schema({
    fistName: String,
    lastName: String,
    email: { 
            type: String,
            required: true,
            unique: true
        },
    role: String,
    sin: Number,
    dob: String,
   /*  localisation: {
        type: mongoose.types.ObjectId,
        ref: 'Localisation'             
    },
    department: {
        type: mongoose.types.ObjectId,
        ref: 'Dept' 
    }
    */
})

module.exports = mongoose.model('Emp', schemaEmp);