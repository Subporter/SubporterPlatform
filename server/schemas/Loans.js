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
	subscription: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subscription',
        required: true
    },
    opponent: {
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
        required: true,
        default: false
    }
});

loanSchema.plugin(autoIncrement, {
    inc_field: "loans_id"
});
loanSchema.plugin(mongooseHidden);

module.exports = loanSchema;