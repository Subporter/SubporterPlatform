const mongoose = require('mongoose'),
	mongooseHidden = require('mongoose-hidden')(),
	autoIncrement = require('mongoose-sequence');

let loanSchema = new mongoose.Schema({
	user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
	date: {
		type: Date,
		required: true
	},
	place: {
		type: String,
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
    },
	hometeam: {
        type: mongoose.Schema.ObjectId,
        ref: 'Team',
        required: true
    },
	awayteam: {
        type: mongoose.Schema.ObjectId,
        ref: 'Team',
        required: true
    },
	placed_on: {
		type: Date,
		required: true,
		default: Date.now
	},
	lent_by: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
	lend_on: {
		type: Date
	},
	paid: {
		type: Boolean,
		default: false
	}
});

loanSchema.plugin(autoIncrement, { inc_field: "loans_id" });
loanSchema.plugin(mongooseHidden);

module.exports = mongoose.model('Loan', loanSchema);