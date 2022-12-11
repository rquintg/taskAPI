const { Router } = require('express')
const {
    register,
    login
} = require('../controllers/auth')

const router = Router()

/**
 * Registro
 */
router.post('/register', register)

/**
 * Login
 */
router.post('/login', login)

module.exports = router