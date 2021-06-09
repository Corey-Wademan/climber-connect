const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const {check, validationResult} = require('express-validator')


// GET api/profile/me 
// Gets current users profile // Private 
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(404).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error")
    }
});

// POST api/profile 
// Create or update user profile // Private
router.post('/', [auth, [
    check('age', 'Age is required').notEmpty(),
    check('climbing_location', 'The location you currently climb in is required').notEmpty(),
    check('gender', 'Gender is required').exists(),
    check('type_climber', 'Your climbing style is required').exists(),
    check('preferred_belay_device', 'Your preferred belay device is required').exists(),
    check('best_time', 'The best times for your climbing availabilty is required').notEmpty()

]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructure Profile Fields
    const { location, climbing_type, climbing_since, other_hobbies, additional_info, youtube, twitter, instagram, facebook } = req.body;

    // Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (location) profileFields.location = location;
    if (climbing_type) profileFields.climbingType = climbing_type;
    if (climbing_since) profileFields.climbingSince = climbing_since;
    if (additional_info) profileFields.additionalInfo = additional_info;
    if (youtube) profileFields.youtube = youtube;
    if (twitter) profileFields.twitter = twitter;
    if (instagram) profileFields.instagram = instagram;
    if (facebook) profileFields.facebook = facebook;
    if (other_hobbies) {
        profileFields.otherHobbies = other_hobbies.split(',').map(hobby => hobby.trim());
    }
    
});

module.exports = router;