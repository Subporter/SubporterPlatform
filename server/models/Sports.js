const mongoose = require('mongoose'),
	mongooseHidden = require('mongoose-hidden')(),
	autoIncrement = require('mongoose-sequence');

let sportSchema = new mongoose.Schema({
	name: String,
	description: String
});

sportSchema.plugin(autoIncrement, { inc_field: "id" });
sportSchema.plugin(mongooseHidden);

module.exports = mongoose.model('Sport', sportSchema);