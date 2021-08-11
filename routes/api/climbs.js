const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const Climb = require('../../models/Climb');


// POST api/climbs
// Add a climb // Access PRIVATE
router.post('/', [auth, [
	check('grade', 'Grade is required').notEmpty(),
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



// DELETE api/climbs/:climb_id
// Delete a climb by climb ID // PRIVATE
router.delete('/:climb_id', auth, async (req, res) => {
	try {
		const climb = await Climb.findById(req.params.climb_id);
		if (!climb) return res.status(404).json({msg: 'Climb does not exist'});

		// Check user
		if (climb.user.toString() !== req.user.id) {
			return res.status(401).json({msg: 'User not authorized'})
		}
		
		await climb.remove()
		res.json({msg: 'Climb has been deleted'})
	} catch (err) {
		console.log(err.message)
    res.status(500).send('Server Error');
	}
});

module.exports = router;