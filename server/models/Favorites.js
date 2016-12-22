const mongoose = require('mongoose'),
	mongooseHidden = require('mongoose-hidden')(),
	autoIncrement = require('mongoose-sequence');

let favoriteSchema = new mongoose.Schema({
	sport: {
        type: mongoose.Schema.ObjectId,
        ref: 'Sport',
        required: true
    },
	competition: {
        type: mongoose.Schema.ObjectId,
        ref: 'Competition',
        required: true
    },
	team: {
        type: mongoose.Schema.ObjectId,
        ref: 'Team',
        required: true
    }
});

favoriteSchema.plugin(autoIncrement, { inc_field: "favorites_id" });
favoriteSchema.plugin(mongooseHidden);

module.exports = mongoose.model('Favorite', favoriteSchema);