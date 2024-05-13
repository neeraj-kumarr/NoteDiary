const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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


// // Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser', validate([
    body('name', 'Name length must be atleast 3 characters').isLength({ min: 3 }).withMessage('Name length must be atleast 5 characters'),
    body('password').isLength({ min: 5 }).withMessage('Password length must be atleast 5 characters'),
    body('email').isEmail().withMessage('Not a valid e-mail address'),
]), async (req, res) => {

    try {
        // add salt to password
        const salt = bcrypt.genSaltSync(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const { name, email } = req.body;

        // If an email is already registered, return error and stop
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // create user
        await User.create({ name, password, email });

        res.send({ name, email, password }); // Sending back only necessary information

        const data = {
            user: {
                id: User.id
            }
        }
        const token = jwt.sign(data, 'shhhhh');
        console.log(token);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }




});

module.exports = router;