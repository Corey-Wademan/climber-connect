const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const POST = require('../../models/Post');
const Climb = require('../../models/Climb')
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

// GET api/profile/ 
// Get all profiles // Public 
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles)
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error")
    }
});

// GET api/profile/user/:user_id
// Get profile by user id // Public 
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).send({msg: 'Profile not found'})
        }

        const climbs = await Climb.find({ user: req.params.user_id});
        
		res.json({profile, climbs})
    } catch (err) {
        console.log(err.message);
        if (err.kind === 'ObjectId') return res.status(400).send({ msg: 'Profile not found' });
        
        // Else sends server error
        res.status(500).send("Server Error")
    }
});

// POST api/profile 
// Create or update user profile // Private
router.post('/', [auth, [
    check('age', 'Age is required', 'Must be a number').notEmpty().isNumeric(),
    check('location', 'The location you currently climb in is required').notEmpty(),
    check('gender', 'Gender is required').exists(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructure Profile Fields
    const { location, climbing_type, additional_info, youtube, twitter, instagram, facebook, best_time, preferred_belay_device, gender, age, climbing_since } = req.body;

    // Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (age) profileFields.age = age;
    if (location) profileFields.location = location;
    if (gender) profileFields.gender = gender;
    if (climbing_since) profileFields.climbing_since = climbing_since;
    if (preferred_belay_device) profileFields.preferred_belay_device = preferred_belay_device;
    if (best_time) profileFields.best_time = best_time;
    if (additional_info) profileFields.additional_info = additional_info;
    if (climbing_type) {
        profileFields.climbing_type = climbing_type;
    }

    // Build social object 
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (facebook) profileFields.social.facebook = facebook;

    // Build leads object
    profileFields.leads = {}
    const { sportLead, tradLead } = req.body;
    if (sportLead) profileFields.leads.sportLead = sportLead;
    if (tradLead) profileFields.leads.tradLead = tradLead;

    // Build follows object
    profileFields.follows = {}
    const { sportFollow, tradFollow } = req.body;
    if (sportFollow) profileFields.follows.sportFollow = sportFollow;
    if (tradFollow) profileFields.follows.tradFollow = tradFollow;


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

// Delete route for trad/sport lead 
// api / profile / leads /: lead_id
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

// Delete route for trad/sport follow 
// api/profile/follows/:follow_id
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

// Delete Profile
// api/profile/
router.delete('/', auth, async (req, res) => {
    try {
        // Remove user posts
        await POST.deleteMany({ user: req.user.id });
        //Remove Profile from db
        await Profile.findOneAndRemove({ user: req.user.id });
        // Remove User from db
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({msg: 'User removed'});
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error');
    }
}); 

// GET api/profile/user/:userID
// Get all user climbs by their ID // PUBLIC
/* router.get('/user/:user_id', async (req, res) => {
	try {
		const climbs = await Climb.findOne({ user: req.params.user_id});
		res.json(climbs)
	} catch (err) {
		console.log(err.message)
    res.status(500).send("Server Error");
	}
}); */

module.exports = router;