const notes = require('express').Router();
const fs = require('fs');
const path = require('path')
const notesDatabase = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');


// GET Route
notes.get('/', (req, res) => {
    res.json(notesDatabase)
})


// POST Route
notes.post('/', (req, res) => {
    console.log(req.body);
    console.info(`${req.method} request received to submit feedback`);

    const { title, text } = req.body;

    if ( title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        notesDatabase.push(newNote);

        fs.writeFileSync('./db/db.json', JSON.stringify(notesDatabase, null, 4))

        const response = {
            status: 'success',
            body: newNote,
          };

      
          res.json(response)
        } else {
          res.json('Error in posting feedback');
        }

});



// DELETE Route for a specific tip
notes.delete('/:id', (req, res) => {

    const noteId = req.params.id;

    notesDatabase.splice(noteId - 1,1);

    notesDatabase.forEach((obj, i) => {
        
      obj.id = i + 1;
    });

    fs.writeFileSync('./db/db.json', JSON.stringify(newData, null, 4), function () {
      res.json(`Item ${id} has been deleted 🗑️`);
    });

    const response = {
      status: 'success',
      body: newData,
    };

    console.log(response);
  
});
  

module.exports = notes;