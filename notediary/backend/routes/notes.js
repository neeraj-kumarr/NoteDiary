const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../Models/Notes')

const validate = validations => {
    return async (req, res, next) => {
        // loop runs against each request
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length) break;
        }
        // if there are no errors, 'next()' will run or execute the code after all the middleware function is finished
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};


// ROUTE 1: Get all notes using: GET "/api/notes/fetchallnotes". Login Required 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// ROUTE 2: Add a new note using: POST "/api/notes/addnotes". Login Required 
router.post('/addnotes', fetchuser,
    [body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })], async (req, res) => {
        try {

            const { title, description, tag } = req.body;

            const notes = new Notes({ title, description, tag, user: req.user.id });

            const savedNote = await notes.save();

            res.json(savedNote)
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Internal Server Error');
        }
    });

// ROUTE 3: Update an existing note by note-id using: PUT "/api/notes/updatenotes/:id". Login Required 
router.put('/updatenotes/:id', fetchuser, async (req, res) => {

    // Get items from body
    const { title, description, tag } = req.body;

    try {

        // Create a newNote Object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };


        // Find the note 
        let notes = await Notes.findById(req.params.id);
        if (!notes) { return res.status(404).send("The note doesn't exist") };

        // Only allow the logged in user to access their own notes
        if (notes.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") };

        // Update the note
        notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ "Notes Updated": { notes } })

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// ROUTE 4: Delete an existing note by note-id using: DELETE "/api/notes/deletenotes/:id". Login Required 
router.delete('/deletenotes/:id', fetchuser, async (req, res) => {

    try {
        // Find the note 
        let notes = await Notes.findById(req.params.id);
        if (!notes) { return res.status(404).json("The note doesn't exist") };

        // Only allow the logged in user to access their own notes
        if (notes.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") };

        // delete the note
        notes = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Your note has been deleted": { notes } })

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;