const express = require('express')

// importing modular router for /notes
const notes = require ('./notes');

const app = express();

//middleware to route to notes
app.use('/notes', notes);

module.exports = app;