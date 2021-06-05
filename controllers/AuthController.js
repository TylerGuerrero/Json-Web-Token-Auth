const { hash, compare, genSalt } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

const User = require('../models/User')
const { loginValiation, registerValidation } = require('../validation/CredentailValidation')

const login_post = async (req, res) => {
    const { username, password } = req.body
    const { error } = loginValiation(req.body)
    
    if (error) return res.status(401).json({err: err.message})

    try {
        const user = await User.findOne({username}).exec()

        if (!user) {
            throw new Error('User was not found')
        }

        const isMatch = await compare(password, user.password)
    
        if (isMatch) {
            let payload = {id: user._id}        
            const token = sign(payload, process.env.SECRET, {expiresIn: '3hr'})
            res.cookie('jwt', token, {httpOnly: true, maxAge: 3*24*60*60})
            return res.status(201).json({id: user._id})
        } else {
            throw new Error('Password does not match')
        }
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const register_post = async (req, res) => {
    const { username, email, password } = req.body
    const { error } = registerValidation(req.body)

    if (error) return res.status(401).send({err: error.details[0].message})

    try {
        let user = await User.findOne({email}).exec()
        
        if (user) {
            return res.status(401).json({err: 'user exists'})
        }

        user = new User({username, email, password})
        const salt = await genSalt(12)
        const hashedPassword = await hash(user.password, salt)
        const newUser = await User.create({username, email, password: hashedPassword})
        
        let payload = {id: newUser._id}
        const token = sign(payload, process.env.SECRET, { expiresIn: '3hr'})
        res.cookie('jwt', token, {httpOnly: true, maxAge: 3 * 24 * 60 * 60})
        return res.status(201).json({id: newUser._id})
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

const logout_get = (req, res) => {
    res.cookie('jwt', ' ', {httpOnly: true, maxAge: 3})
    return res.status(201).json({log: 'You are now logged out'})
}

module.exports = {
    login_post,
    register_post,
    logout_get
}