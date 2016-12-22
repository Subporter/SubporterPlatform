const mongoose = require('mongoose'),
	mongooseHidden = require('mongoose-hidden')(),
	autoIncrement = require('mongoose-sequence');

let nameRegExp = /^[a-zA-Z]{1,100}$/;
let descriptionRegExp = /^[a-zA-Z]{1,1000}$/;
let countryRegExp = /^[a-zA-Z]{1,50}$/;

let competitionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		match: nameRegExp
	},
	description: {
		type: String,
		required: true,
		match: descriptionRegExp
	},
	country: {
		type: String,
		required: true,
		match: countryRegExp
	},
	sport: {
        type: mongoose.Schema.ObjectId,
        ref: 'Sport',
        required: true
    }
});

competitionSchema.plugin(autoIncrement, { inc_field: "competitions_id" });
competitionSchema.plugin(mongooseHidden);

module.exports = mongoose.model('Competition', competitionSchema);