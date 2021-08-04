const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const Climb = require('../../models/Climb');

// POST api/climbs
// Access PUBLIC
// Add a climb
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
			const newClimb = new Climb(climbFields);
			await newClimb.save();
			console.log('Climb logged');
			res.json(newClimb);
			
		} catch (err) {
			console.log(err.message)
      res.status(500).send('Server Error')
		}
});

module.exports = router;