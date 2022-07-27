/* Importing the userModel.js file. */
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

/**
 * It takes an id, and returns a token that expires in 3 days.
 * @param _id - The user's id
 * @returns The token is being returned.
 */
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d' })
}
//login user
/**
 * It's a function that takes in a request and a response object and returns a json object with a
 * message property.
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
const loginUser = async (req, res) => {
    const {email, password} = req.body
    

    try {
        const user = await User.login(email, password)

    //create a token

  /* It's creating a token with the user's id. */
    const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error){
        res.status(400).json({error: error.message})
    }

}





// signup user


/**
 * It takes in an email and password from the request body, then it calls the signup function from the
 * User model, and if it's successful, it returns a 200 status code with the email and user, otherwise
 * it returns a 400 status code with the error message.
 * @param req - the request object
 * @param res - the response object
 */
const signupUser = async (req, res) => {

    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)

    //create a token

  /* It's creating a token with the user's id. */
    const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error){
        res.status(400).json({error: error.message})
    }

}

/* It's exporting the signupUser and loginUser functions. */
module.exports = { signupUser, loginUser }