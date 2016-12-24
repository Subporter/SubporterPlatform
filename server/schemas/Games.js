const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')(),
    autoIncrement = require('mongoose-sequence');

let gameSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    home: {
        type: mongoose.Schema.ObjectId,
        ref: 'Team',
        required: true
    },
	away: {
        type: mongoose.Schema.ObjectId,
        ref: 'Team',
        required: true
    }
});

gameSchema.plugin(autoIncrement, {
    inc_field: "games_id"
});
gameSchema.plugin(mongooseHidden);

module.exports = gameSchema;