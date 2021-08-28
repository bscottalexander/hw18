const express = require('express');
const mongoose = require('mongoose');
const db = require('./models');

mongoose.connect('mongodb+srv://bscottalexander:Zyborn123@cluster0.g0jbq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const app = express();
app.use(express.static(__dirname + '/public', { extensions: ['html'] }));
app.use(express.json());

app.get('/api/workouts', async (req, res) => {
    const data = await db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: '$exercises.duration' },
            },
        },
    ]).sort({ day: 1 });
    res.json(data);
});

app.get('/api/workouts/range', async (req, res) => {
    console.log(req.body);
    const data = await db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: '$exercises.duration' },
            },
        },
    ]).sort({ day: 1 });
    res.json(data);
})

app.post('/api/workouts', async (req, res) => {
    const newWorkout = await new db.Workout({day: new Date()}).save();
    res.json(newWorkout);
});

app.put('/api/workouts/:id', async (req, res) => {
    const currentRecord = await db.Workout.findOne()
        .sort({ day: -1 })
        .limit(1)
        .exec();
    currentRecord.exercises.push(req.body);
    await currentRecord.save();
    res.json(currentRecord);
});

const port = process.env.PORT || 80;

const main = () => {
    app.listen(port, () => {});
};

if (require.main === module) {
    main();
}
