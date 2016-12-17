const mongoose = require('mongoose'),
	mongooseHidden = require('mongoose-hidden')(),
	autoIncrement = require('mongoose-sequence');

let teamSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	stadion: {
		type: String,
		required: true
	},
	street: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	postal: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	sports_id: {
		type: Number,
		required: true
	},
	competitions_id: {
		type: Number,
		required: true
	}
});

teamSchema.plugin(autoIncrement, { inc_field: "teams_id" });
teamSchema.plugin(mongooseHidden);

module.exports = mongoose.model('Team', teamSchema);