const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

/**
 * Creates a token for a given ID.
 *
 * @param {string} _id - The ID used to create the token.
 * @return {string} The generated token.
 */
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

/**
 * Login user with email and password
 * @function
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} req.body.email - User's email
 * @param {string} req.body.password - User's password
 * @returns {Object} - Returns email and token if successful, or error message if failed
 */
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const signupUser = async (req, res) => {
/**
 * Sign up a user with the provided email and password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object with the user's email and token.
 */
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }