const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    age: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    climbing_type: {
        type: [String]
    },
    member_since: {
        type: Date,
        default: Date.now
    },
    climbing_since: {
        type: Date,
    },
    preferred_belay_device: {
        type: String
    },
    leads: {
        sportLead: {
            type: String
        },
        tradLead: {
            type: String
        },
    },
    follows: {
        sportFollow: {
            type: String,
        },
        tradFollow: {
            type: String,
        }
    },
    best_time: {
        type: String
    },
    additional_info: {
        type: String
    },
    social: {
        youtube: {
          type: String
        },
        twitter: {
          type: String
        },
        facebook: {
          type: String
        },
        instagram: {
          type: String
        }
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);