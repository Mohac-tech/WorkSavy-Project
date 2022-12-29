//Joi
//Joi-password complexity
const Joi = require('joi');

const logInBodyValidation = Joi.object({
    username: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).max(15).required()
})
const registerEmpValidation = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).max(15).required(),
    firstN: Joi.string().required(),
    lastN: Joi.string().required(),
    role: Joi.string().required(),
    sin: Joi.string().required(),
    dob: Joi.string().required(),
    phoneN: Joi.string().required(),
    image: Joi.string().required(),
    localisation: Joi.string().required(),
    dept: Joi.string().required()
})

const registerUsersValidation = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).max(15).required(),
    firstN: Joi.string().required(),
    lastN: Joi.string().required(),
    dob: Joi.string().required(),
    image: Joi.string().required(),
    phoneN: Joi.string().required(),
    localisation: Joi.string().required(),
    dept: Joi.string().required(),
    tokens: Joi.string()
})

module.exports = { logInBodyValidation, registerUsersValidation }