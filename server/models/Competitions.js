const mongoose = require('mongoose'),
	mongooseHidden = require('mongoose-hidden')(),
	autoIncrement = require('mongoose-sequence');

let competitionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
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
	}
});

competitionSchema.plugin(autoIncrement, { inc_field: "competitions_id" });
competitionSchema.plugin(mongooseHidden);

module.exports = mongoose.model('Competition', competitionSchema);