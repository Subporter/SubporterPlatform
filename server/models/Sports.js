const mongoose = require('mongoose'),
	mongooseHidden = require('mongoose-hidden')(),
	autoIncrement = require('mongoose-sequence');

let sportSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

sportSchema.plugin(autoIncrement, { inc_field: "sports_id" });
sportSchema.plugin(mongooseHidden);

module.exports = mongoose.model('Sport', sportSchema);