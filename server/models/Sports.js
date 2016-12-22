const mongoose = require('mongoose'),
	mongooseHidden = require('mongoose-hidden')(),
	autoIncrement = require('mongoose-sequence');

let nameRegExp = /^[a-zA-Z]{1,100}$/;
let descriptionRegExp = /^[a-zA-Z]{1,1000}$/;

let sportSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		match: nameRegExp
	},
	description: {
		type: String,
		required: true,
		match: descriptionRegExp
	}
});

sportSchema.plugin(autoIncrement, { inc_field: "sports_id" });
sportSchema.plugin(mongooseHidden);

module.exports = mongoose.model('Sport', sportSchema);