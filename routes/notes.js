// creating the express router and importing the needed uuid and readAndAppend/readFromFile functions to read and write to the db.json file

const notes = require('express').Router();
const {v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET route for reading note db.json   
notes.get('/', (req,res) => 
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

//POST route for submitting to the note db.json
notes.post('/', (req,res) => {

    // destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // checking that the body has all the required properties
    if (title && text) {

        // new variable to save the req as a object
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'Success',
            body: newNote,
        };

        res.json(response)
    } else {
        res.json('Error in posting feedback')
    }

});

module.exports = notes;