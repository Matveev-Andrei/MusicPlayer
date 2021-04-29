require('dotenv').config();
const express = require('express');
const cors = require('cors');
const lyricsFinder = require('lyrics-finder')

const app = express();
const port = 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// connect with mongoose config
require('./config/mongoose.config');

// routes below
require('./routes/user.routes')(app);
app.get('/lyrics', async (req, res) => {
    const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || "Searching for lyrics..."
    res.json({lyrics});
})


app.listen(port, () => console.log("Listening on port: " + port));
