//Joi
//Joi-password complexity
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const logInBodyValidation = (body) => {
    const schema = Joi.object({
        username: Joi.string().email().required().label("User Name"),
        password: passwordComplexity().required().label("Password")
    })
    return schema.validate(body);
}

module.exports = {
    logInBodyValidation
}