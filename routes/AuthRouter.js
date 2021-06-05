const router = require('express').Router()

const { login_post, register_post, logout_get } = require('../controllers/AuthController')

router.post('/login', login_post)

router.post('/register', register_post)  

router.get('/logout', logout_get)

module.exports = router