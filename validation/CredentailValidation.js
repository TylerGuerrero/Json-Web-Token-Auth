const Joi = require('Joi')

const loginValiation = (body) => {
    const schema = Joi.object({
        username: Joi.string().required().min(6),
        password: Joi.string().min(6).required()
    })

    return schema.validate(body)
}

const registerValidation = (body) => {
    const schema = Joi.object({
        username: Joi.string().required().min(6),
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required()
    })

    return schema.validate(body)
}

module.exports = {
    loginValiation,
    registerValidation
}