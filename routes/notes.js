const notes = require('express').Router();
const fs = require('fs');
const notesDatabase = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');


// GET Route
notes.get('/notes', (req, res) => {
    res.json(notesDatabase)
})

// GET Route for a specific tip
// tips.get('/:notes_id', (req, res) => {
//     const noteId = req.params.note_id;
//     readFromFile('./db/tips.json')
//       .then((data) => JSON.parse(data))
//       .then((json) => {
//         const result = json.filter((tip) => tip.tip_id === tipId);
//         return result.length > 0
//           ? res.json(result)
//           : res.json('No tip with that ID');
//       });
//   });

// POST Route
notes.post('/notes', (req, res) => {
    console.log(req.body);
    console.info(`${req.method} request received to submit feedback`);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        notesDatabase.push(newNote);

        fs.writeFile('../db/db.json', JSON.stringify(notesDatabase, null, 4))

        const response = {
            status: 'success',
            body: newNote,
          };
      
          res.json(response);
        } else {
          res.json('Error in posting feedback');
        }

});



// DELETE Route for a specific tip
// notes.delete('/:note_id', (req, res) => {
//     const noteId = req.params.note_id;
//     readFromFile('./db/tips.json')
//       .then((data) => JSON.parse(data))
//       .then((json) => {
//         // Make a new array of all tips except the one with the ID provided in the URL
//         const result = json.filter((tip) => tip.tip_id !== tipId);
  
//         // Save that array to the filesystem
//         writeToFile('./db/tips.json', result);
  
//         // Respond to the DELETE request
//         res.json(`Item ${tipId} has been deleted 🗑️`);
//       });
//   });

module.exports = notes;