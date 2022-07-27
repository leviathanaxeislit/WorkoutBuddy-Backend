
require('dotenv').config() 


const express = require("express")
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const cors = require('cors')
//Express App
const app = express();

app.use(cors())

//middleware

app.use(express.json())

/* A middleware function that logs the path and method of the request. */
app.use( (req, res, next) => {
    console.log(req.path,req.method);
    next()
});

//routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)


/* Connecting to the database and then running the code inside the then block. */
/* The below code is connecting to the mongoDB database and then listening to the port that is set in
the .env file. */
mongoose.connect(process.env.MONGO_URI).
then(() =>{
// listen to Requests
/* Listening to the port that is set in the .env file. */
app.listen(process.env.PORT, () => {
    console.log(`connected to DB & listening on port ${process.env.PORT}!`)
});

})
.catch((error) => {
    console.log(error)
})

