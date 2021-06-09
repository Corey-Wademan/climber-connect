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
    check('best_time', 'The best times for your climbing availabilty is required').notEmpty(),

]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructure Profile Fields
    const { location, climbing_type, other_hobbies, additional_info, youtube, twitter, instagram, facebook, best_time, preferred_belay_device,type_climber, gender, climbing_location, age, climbing_since } = req.body;

    // Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (age) profileFields.age = age;
    if (location) profileFields.location = location;
    if (climbing_location) profileFields.climbing_location = climbing_location;
    if (gender) profileFields.gender = gender;
    if (climbing_type) profileFields.climbingType = climbing_type;
    if (climbing_since) profileFields.climbing_since = climbing_since;
    if (type_climber) profileFields.type_climber = type_climber;
    if (preferred_belay_device) profileFields.preferred_belay_device = preferred_belay_device;
    if (best_time) profileFields.best_time = best_time;
    if (additional_info) profileFields.additionalInfo = additional_info;
    if (other_hobbies) {
        profileFields.otherHobbies = other_hobbies.split(',').map(hobby => hobby.trim());
    }
    if (climbing_type) {
        profileFields.climbing_type = climbing_type.split(',').map(hobby => hobby.trim());
    }

    // Build social object 
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (facebook) profileFields.social.facebook = facebook;

        try {
            let profile = await Profile.findOne({ user: req.user.id });
            if (profile) {
                // Update
                profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
                console.log('Profile updated')
                return res.json(profile);
            }

            // Create
            profile = new Profile(profileFields);
            await profile.save();
            console.log('Profile created')
            res.json(profile);
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Server Error')
        }
});

// Update route for trad/sport leading api/profile/leads
router.put('/leads', auth, async (req, res) => {

    // Build leads object
    const { sportLead, tradLead } = req.body;
    const leadsObj = { sportLead, tradLead };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.leads.unshift(leadsObj);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error');
    }

});

// Update route for trad/sport follow api/profile/follows
router.put('/follows', auth, async (req, res) => {

    // Build follows object
    const { sportFollow, tradFollow } = req.body;
    const followsObj = { sportFollow, tradFollow };
    
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.follows.unshift(followsObj);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error');
    }
});

// Delete route for trad/sport lead api/profile/leads/:lead_id
router.delete('/leads/:lead_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // Get index
        const deleteIndex = profile.leads.map(item => item.id).indexOf(req.params.lead_id);
        profile.leads.splice(deleteIndex, 1);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error');
    }
});

// Delete route for trad/sport follow api/profile/follows/:follow_id
router.delete('/follows/:follow_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        // Get index
        const deleteIndex = profile.follows.map(item => item.id).indexOf(req.params.follow_id);
        profile.follows.splice(deleteIndex, 1);
        
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error');
    }
}); 

module.exports = router;