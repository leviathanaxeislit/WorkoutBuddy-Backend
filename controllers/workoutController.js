/* Importing the Workout model and mongoose. */
const Workout = require("../models/workoutModel");
const mongoose = require('mongoose')

// get all workouts
/**
 * This function is an asynchronous function that uses the Workout model to find all the workouts in
 * the database and sorts them by the date they were created. 
 * 
 * The function then sends a response to the client with a status of 200 and the workouts.
 * @param req - request
 * @param res - the response object
 */
const getWorkouts = async(req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

// get a single workout
/**
 * It takes the id from the url, checks if it's a valid id, then finds the workout by id and returns
 * it.
 * @param req - the request object
 * @param res - the response object
 * @returns {
 *     "_id": "5d8f8f8f8f8f8f8f8f8f8f8f",
 *     "name": "Workout 1",
 *     "exercises": [
 *         {
 *             "_id": "5d8f8f8f8f8f8f8f8f8
 */
const getWorkout = async (req, res) =>{
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such workout'})
        
    }


    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}

// create a new workout
const createWorkout =  async(req, res) =>{
    const { title, load, reps } = req.body;

   /* Checking if the fields are empty. */
    let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }
    
    
    
    // add doc to db
   /* Creating a new workout and sending it back to the client. */
    try {
      const workout = await Workout.create({ title, load, reps });
      res.status(200).json(workout);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}



// delete a workout
/**
 * This function deletes a workout from the database.
 * @param req - request
 * @param res - the response object
 */
const deleteWorkout = async (req, res) =>{
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such workout'})
        
    }
    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}



// update a workout
/**
 * It takes the id of a workout, and updates the workout with the new information provided in the
 * request body.
 * @param req - the request object
 * @param res - the response object
 * @returns The workout that was updated.
 */

const updateWorkout = async(req, res) =>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'no such workout'})
        
    }
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
}

/* Exporting the functions so that they can be used in other files. */
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}