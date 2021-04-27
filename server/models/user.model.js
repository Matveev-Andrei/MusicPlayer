const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [ true, "You need to provide a handle for your account" ],
        index: { unique: true }
    },
    email: {
        type: String,
        required: [ true, "You need to provide an email address" ],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    display_name: {
        type: String,
        required: [ true, "You need to provide a display name"]
    },
    favoriteSongs: [{
        songId: {
            type: String,
            required: [ true, "Please provide this song's id from spotify"],
            index: { unique: true }
        },
        name: {
            type: String,
            required: [ true, "Please provide the name of this song"]
        },
        artist: {
            type: String,
            required: [ true, "Please provide the artist of this song"]
        }
    }]
}, { timestamps: true});

module.exports = mongoose.model("User", UserSchema);