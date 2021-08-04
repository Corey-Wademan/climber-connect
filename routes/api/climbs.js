const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const { findOneAndUpdate } = require( '../../models/Climb' );
const Climb = require('../../models/Climb');


// POST api/climbs
// Add or Update a climb // Access PUBLIC
router.post('/', [auth, [
	check('grade', 'Grade is required').notEmpty(),
	check('setting', 'Setting is required').notEmpty(),
	check('style', 'Climb style is required').notEmpty()
]], async (req, res) => {
	const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

		// Destructure Climb Fields
		const { setting, grade, style, date, pitches, location, comment } = req.body;

		// Climb Object
		const climbFields = {};
		climbFields.user = req.user.id;

		// Handling if climb is already recorded
		if (setting) climbFields.setting = setting;
		if (grade) climbFields.grade = grade;
		if (style) climbFields.style = style;
		if (date) climbFields.date = date;
		if (pitches) climbFields.pitches = pitches;
		if (location) climbFields.location = location;
		if (comment) climbFields.comment = comment;



		try {
			let climb = await Climb.findOne({ id: req.body._id})
			if (climb) {
				// Update 
				climb = await Climb.findOneAndUpdate({ user: req.user.id}, {$set: climbFields}, {new: true});
				console.log('Climb Updated');
				return res.json(climb)
			}

			// Add new climb
			const newClimb = new Climb(climbFields);
			await newClimb.save();
			console.log('Climb logged');
			res.json(newClimb);
			
		} catch (err) {
			console.log(err.message)
      res.status(500).send('Server Error')
		}
});

// GET api/climbs/:userID
// Get all user climbs by their ID // PUBLIC
router.get('/:user_id', async (req, res) => {
	try {
		const climbs = await Climbs.findOne({ user: req.params.user_id}).find();
		res.json(climbs)
	} catch (err) {
		console.log(err.message)
    res.status(500).send("Server Error");
	}
});

module.exports = router;