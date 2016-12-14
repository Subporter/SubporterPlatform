const mongoose = require('mongoose'),
	mongooseHidden = require('mongoose-hidden')(),
	autoIncrement = require('mongoose-sequence');

let loanSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	date: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	place: {
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
	},
	hometeam_id: {
		type: Number,
		required: true
	},
	awayteam_id: {
		type: Number,
		required: true
	},
	lend_by: String,
	lend_on: String
});

loanSchema.plugin(autoIncrement, { inc_field: "loans_id" });
loanSchema.plugin(mongooseHidden);

module.exports = mongoose.model('Loan', loanSchema);