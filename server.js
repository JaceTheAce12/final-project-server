const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');

const courses = require('./modules/courses');
const scores = require('./modules/scores');

app.use(express.json());
app.use(cors());

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.get('/scores', (req, res) => {
    res.json(scores);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});