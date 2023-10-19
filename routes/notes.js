// creating the express router and importing the needed uuid and readAndAppend/readFromFile functions to read and write to the db.json file

const notes = require('express').Router();
const {v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

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

//working on delete request. Got most of it. Don't know if the /:id is the correct means, Need to double check how this is getting the id. 
// making a delete request for a specific 
notes.delete('/:id', (req,res) => {

    // getting the id
    const noteId = req.params.id;
    console.log(noteId);
    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {

            // making a new array of all the notes with out the one with the provided Id.
            //error I was stuck at was the json.filter((id)) original I was using noteId as the reference, but it seemded to be confliced since there is a noteid higher in the formula and possibly that there is noteid at the end. either way it is working now. 
            const result = json.filter((id) => id.id !== noteId)

            //Saving the array to the file
            writeToFile('./db/db.json', result)

            res.json(`Item ${noteId} has been deleted`)
        });
});

module.exports = notes;