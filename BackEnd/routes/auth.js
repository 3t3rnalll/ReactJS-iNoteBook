const express = require('express');
const User = require('../models/User')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')
const jwt_secret_string = 'this string is secret';


//ROUTE1 : create a User using POST : "/api/auth/createuser".no login required.

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
        const data = {
            user: {
                id: user.id
            }
        }
        var token = jwt.sign(data, jwt_secret_string);

        //send response as json
        res.json({ token })

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Error Occured');
    }
})

//ROUTE2 : login a User using POST : "/api/auth/login".no login required.

router.post('/login', [
    body('email', 'Enter the valid email').isEmail(),
    body('password', "password can't be blank").exists(),
], async (req, res) => {

    //Error validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "pls login with correct email Credential" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare)
            return res.status(400).json({ error: "pls login with correct password Credential" });

        const data = {
            user: {
                id: user.id
            }
        }

        var token = jwt.sign(data, jwt_secret_string);
        res.json({ token })

    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Error Occured');
    }

})


//ROUTE3 : loggedin User details using POST : "/api/auth/getuser".login required.

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        let userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Error Occured');
    }
})



module.exports = router