const mongoose = require('mongoose');
const ClimbSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user"
	},
	profile: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "profile"
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
		type: String
	},
	location: {
		type: String,
	},
	comment: {
		type: String
	}
})

module.exports = Climb = mongoose.model('climb', ClimbSchema);