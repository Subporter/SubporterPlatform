const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')(),
    autoIncrement = require('mongoose-sequence');

let regExp = /^[a-zA-Z]{1,100}$/;

let teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: regExp
    },
    stadion: {
        type: String,
        required: true,
        match: regExp
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 99
    },
    address: {
        type: mongoose.Schema.ObjectId,
        ref: 'Address',
        required: true
    },
    sport: {
        type: mongoose.Schema.ObjectId,
        ref: 'Sport',
        required: true
    },
    competition: {
        type: mongoose.Schema.ObjectId,
        ref: 'Competition',
        required: true
    }
});

teamSchema.plugin(autoIncrement, {
    inc_field: "teams_id"
});
teamSchema.plugin(mongooseHidden);

module.exports = teamSchema;