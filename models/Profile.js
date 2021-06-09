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
        enum: ["Alabama", "Alaska", "American Samoa", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Guam", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Minor Outlying Islands", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Northern Mariana Islands", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "U.S. Virgin Islands", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true
    },
    climbing_type: {
        type: String,
        enum: ["Boulder", "Sport", "Trad", "Toprope", "Gym"]
    },
    member_since: {
        type: Date,
        default: Date.now
    },
    climbing_since: {
        type: Date
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
            sport: {
                type: String,
                enum: ["5.7", "5.8", "5.9", "5.10", "5.11", "5.12", "5.13", "5.14"]
        },
            trad: {
                type: String,
                enum: ["5.7", "5.8", "5.9", "5.10", "5.11", "5.12", "5.13", "5.14"]
            }
        }
    ],
    follows: [
        {
            sport: {
                type: String,
                enum: ["5.7", "5.8", "5.9", "5.10", "5.11", "5.12", "5.13", "5.14"]
        },
            trad: {
                type: String,
                enum: ["5.7", "5.8", "5.9", "5.10", "5.11", "5.12", "5.13", "5.14"]
            }
        }
    ],
    best_time: {
        type: String,
        required: true
    },
    other_hobbies: {
        type: [String]
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