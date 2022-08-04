/* This is importing the express module and the workoutController module. */
const express = require("express");
const { 
    createWorkout,
getWorkout,
getWorkouts, 
updateWorkout,
deleteWorkout} = require("../controllers/workoutController");


const requireAuth = require('../middleware/requireAuth')
/* This is the router. It is a middleware that is used to handle HTTP requests. It is used to create
modular, mountable route handlers. A Router instance is a complete middleware and routing system;
for this reason, it is often referred to as a “mini-app”. */
const router = express.Router();

router.use(requireAuth)

// GET all workouts

router.get("/", getWorkouts)

//GET a single workout

router.get("/:id", getWorkout)

//POST a new workout
router.post("/", createWorkout)

//DELETE a workout
router.delete("/:id", deleteWorkout);

//UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;
