const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User')
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');


// GET api/auth 
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

// Authenticate a user @api/auth 
router.post('/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({email})
            if (!user) {
                res.status(400).json({ errors: [{msg: 'Invalid user credentials'}]})
            };

            const ifMatched = await bcrypt.compare(password, user.password);
            if (!ifMatched) return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
                console.log(token)
            });
        } catch(error) {
            console.log(error.message)
            res.status(500).send('Server Error')
        }


        

    console.log(req.body)
});

module.exports = router;