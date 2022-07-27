/* This is importing the mongoose, bcrypt, validator, and Schema modules. */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

/* This is creating a new schema for the user model. */
const userSchema = new Schema({
   email: {
    type: String,
    require: true,
    unique: true
   },
   password: {
    type: String,
    required: true
   } 
})

//static signup method
/* This is creating a static method called signup. */
userSchema.statics.signup = async function(email, password) {
    
    //validation

/* This is checking to see if the email and password are filled out. If they are not filled out, it
will throw an error. If the email is not valid, it will throw an error. If the password is not
strong enough, it will throw an error. If the email is already in use, it will throw an error. If
the email and password are valid, it will create a new user. */

    if (!email || !password){
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({ email })

    if(exists) {
        throw Error('Email already in use')
    }
    
 /* This is generating a salt and hashing the password. */
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash})

    return user
    

}


//static login Method

userSchema.statics.login = async function(email, password){
    
    if (!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if(!user) {
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match){
        throw Error('Incorrect password')
    }
    
    return user

}

module.exports = mongoose.model('User', userSchema)