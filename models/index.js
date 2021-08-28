const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const db = mongoose.connection;

const ExerciseSchema = new Schema({
    type: String,
    name: String,
    duration: Number,
    distance: Number,
    weight: Number,
    reps: Number,
    sets: Number,
});

const WorkoutSchema = new Schema({
    day: Date,
    exercises: [ExerciseSchema],
});

db.Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = db;
