const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const issueRoutes = require('./routes/issues');

const app = express();
const config = require('./config');

let issue = require('./model/issues');

app.use(bodyParser.json());
app.use('/issue', issueRoutes);

mongoose.connect('mongodb://localhost:27017/rock-the-boat', () => {
    console.log('Connected to Mongo');
})


app.listen(config.port, () => {
    console.log('listening on ' + config.port);
})


