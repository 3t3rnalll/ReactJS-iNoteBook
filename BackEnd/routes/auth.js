const express = require('express');
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


//create a User using POST : "/api/auth/".no login required.

router.post('/createuser', [
    body('name', 'Enter the valid name').isLength({ min: 3 }),
    body('email', 'Enter the valid email').isEmail(),
    body('password', 'Password should be atleast 5 characters').isLength({ min: 7 }),
], async (req, res) => {

    //Error validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //find a unique email
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: 'please enter a unique value for email' })
        }

        //encrypt password
        const salt = await bcrypt.genSalt(10)
        secpass = await bcrypt.hash(req.body.password, salt)
        //create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass,
        })
        let jwt_secret_string = 'this string is secret'
        const data = {
            user: {
                id: user._id
            }
        }
        var token = jwt.sign(data, jwt_secret_string);
        console.log(token)


        //send response as json
        res.json({ token })

    } catch (error) {
        console.log(error)
        res.status(500).send('Some error Occured ');
    }
})

module.exports = router