require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// connect with mongoose config
require('./config/mongoose.config');

// routes below
require('./routes/user.routes')(app);


app.listen(port, () => console.log("Listening on port: " + port));
