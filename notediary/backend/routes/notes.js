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



module.exports = router;