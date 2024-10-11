const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');


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


// Route 1: Create a User
router.post('/createuser', validate([
    // Validation middleware
]), async (req, res) => {
    try {
        // Your user creation logic

        const { name, email } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const password = await bcrypt.hash(req.body.password, salt);

        // Create the user
        const newUser = await User.create({ name, password, email });

        // Set the user's ID in the JWT payload
        const token = jwt.sign({ user: { id: newUser.id } }, 'shhhhh');

        res.json({ authtoken: token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Route 2: User Login
router.post('/login', validate([
    // Validation middleware
]), async (req, res) => {
    try {
        // Your login logic

        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ error: 'Please provide correct login credentials' });
        }

        const passwordCompare = await bcrypt.compare(password, existingUser.password);

        if (!passwordCompare) {
            return res.status(400).json({ error: 'Please provide correct login credentials' });
        }

        // Set the user's ID in the JWT payload
        const token = jwt.sign({ user: { id: existingUser.id } }, 'shhhhh');

        res.json({ authtoken: token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});


// Route 3: Get a User  using: POST "/api/auth/getuser". Doesn't require Auth
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
});


module.exports = router;