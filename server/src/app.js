const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes.js');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes); 

module.exports = app;
