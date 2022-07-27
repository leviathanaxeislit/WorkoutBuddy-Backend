const express = require('express')


// controller Functions

/* Importing the functions from the userController.js file. */
const { signupUser, loginUser} =  require('../controllers/userController')


const router = express.Router()



//login Route
router.post('/login', loginUser)


// signup route
router.post('/signup', signupUser)

module.exports = router