const { verify, decode } = require('jsonwebtoken')

const isAuth = (req, res, next) => {
    const token = req.cookies.jwt
    // req.header('jwt')

    if (!token) return res.status(401).json({err: 'JWT token does not exists'})

    try {
        const verified = verify(token, process.env.SECRET)
        req.user = verified
        console.log(decode(token))
        next()
    } catch(err) {
        return res.status(401).json({err: err.message})
    }
}

module.exports = {
    isAuth
}