const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')({
        defaultHidden: {
            __v: true
        }
    }),
    autoIncrement = require('mongoose-increment');

let loanSchema = new mongoose.Schema({
    placed_on: {
        type: Date,
        required: true,
        default: Date.now
    },
    paid: {
        type: Boolean,
        required: true,
        default: false
    },
    lend_on: {
        type: Date
    },
    lent_by: {
        type: Number,
        ref: 'User',
        required: true
    },
    user: {
        type: Number,
        ref: 'User',
        required: true
    },
    subscription: {
        type: Number,
        ref: 'Subscription',
        required: true
    },
    game: {
        type: Number,
        ref: 'Game',
        required: true
    }
}, {
    _id: false
});

loanSchema.plugin(autoIncrement, {
    modelName: 'Loan',
    fieldName: '_id'
});
loanSchema.plugin(mongooseHidden);

module.exports = loanSchema;