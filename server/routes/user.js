const express = require('express')

// controller functions
const { loginUser, signupUser } = require('../controllers/userController')

const router = express.Router()

/**
 * @route POST /login
 * @description Login user
 * @access Public
 */
router.post('/login', loginUser)

/**
 * @route POST /signup
 * @description Signup user
 * @access Public
 */
router.post('/signup', signupUser)

module.exports = router