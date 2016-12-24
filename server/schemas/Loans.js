const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')(),
    autoIncrement = require('mongoose-sequence');

let loanSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
	subscription: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subscription',
        required: true
    },
	game: {
		type: mongoose.Schema.ObjectId,
		ref: 'Game',
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
        required: true,
        default: false
    }
});

loanSchema.plugin(autoIncrement, {
    inc_field: "loans_id"
});
loanSchema.plugin(mongooseHidden);

module.exports = loanSchema;