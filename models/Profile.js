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
        type: String
    },
    climbing_location: {
        type: String,
        enum: ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
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
    type_climber: {
        type: String,
        required: true
    },
    preferred_belay_device: {
        type: String,
        required: true
    },
    leads: [
        {
            sportLead: {
                type: String
            },
            tradLead: {
                type: String
            },
        }
    ],
    follows: [
        {
            sportFollow: {
                type: String,
            },
            tradFollow: {
                type: String,
            }
        }
    ],
    best_time: {
        type: String,
        required: true
    },
    additional_info: {
        type: String
    },
    other_hobbies: {
        type: [String]
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