const mongoose = require('mongoose');
const ClimbSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users'
	},
	setting: {
		type: String,
		required: true
	},
	grade: {
		type: String,
		required: true
	},
	style: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	pitches: {
		type: Number
	},
	location: {
		type: String,
	},
	comment: {
		type: String
	}
})

module.exports = Climbs = mongoose.model('climb', ClimbSchema);