/* This is importing the mongoose library and creating a new schema. */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

/* This is creating a new schema for the workout model. */
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
