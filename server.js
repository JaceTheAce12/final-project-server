const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const courses = require('./modules/courses');
const scores = require('./modules/scores');

app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    fs.writeFileSync('userImage.json', JSON.stringify({ imagePath }));

    res.json({ success: true, filePath: imagePath });
});

app.get('/user-image', (req, res) => {
    if (fs.existsSync('userImage.json')) {
        const data = fs.readFileSync('userImage.json');
        const { imagePath } = JSON.parse(data);
        res.json({ success: true, imagePath });
    } else {
        res.json({ success: false, message: 'No image was found' });
    }
});

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.get('/scores', (req, res) => {
    res.json(scores);
});

app.post('/scores', (req, res) => {
    const newRound = req.body;
    scores.push(newRound);
    res.status(201).json(newRound);
});

app.delete('/scores/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); 
    const index = scores.findIndex((round) => round.id === id);
    if (index !== -1) {
        scores.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'Round was not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});