const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require("dotenv");
const authorization = require('../middleware/authorization');
dotenv.config();
const jwtsecret = process.env.jwtsecret;

// @route-1: POST api/auth/addUser
// @desc add a user [SIGN UP]
// @access PUBLIC
router.post('/addUser', [
    body('name', 'Name must be atleast 3 characters').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 3 characters').isLength({ min: 3 }),
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { name, email, password } = req.body;
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: 'User already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);

            user = new User({
                name,
                email,
                password: secPass
            });

            await user.save();

            // create a payload and sending to the jwt.sign() function for getting the token
            const data = {
                user: {
                    id: user.id
                }
            };

            const authtoken = jwt.sign(data, jwtsecret);
            res.status(200).json({ authtoken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    })

// @route-2: POST api/auth/loginUser
// @desc Login
// @access PUBLIC
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 3 characters').exists(),
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ msg: 'User does not exists' });
            }

            // if user exists and the password does'nt match
            const comparePass = await bcrypt.compare(password, user.password)
            console.log(comparePass);

            if (!comparePass) {
                return res.status(400).json({ msg: 'Wrong Password' });
            }

            // if the password matches then get the token and use it for further authorization purposes.
            const payload = {
                user: {
                    id: user.id
                }
            };

            const authtoken = jwt.sign(payload, jwtsecret);
            res.status(200).json({ authtoken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }

)

// @route-3 api/auth/getUser
// @desc get the user after logging
// @access PRIVATE
router.get('/getUser', authorization, async (req, res) => {
    try {
        const id = req.user.id;
        let user = await User.findById(id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
})



module.exports = router;