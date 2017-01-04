const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')({
        defaultHidden: {
            __v: true,
            created_at: true,
            updated_at: true
        }
    }),
    autoIncrement = require('mongoose-increment');

let loanSchema = new mongoose.Schema({
    game: {
        type: Number,
        ref: 'Game',
        required: true
    },
	lent: {
        type: Boolean,
        required: true,
        default: false
    },
    lent_by: {
        type: Number,
        ref: 'User'
    },
    lent_on: {
        type: Date
    },
    lent_out_by: {
        type: Number,
        ref: 'User',
        required: true
    },
    paid: {
        type: Boolean,
        required: true,
        default: false
    },
    placed_on: {
        type: Date,
        required: true,
        default: Date.now
    },
    subscription: {
        type: Number,
        ref: 'Subscription',
        required: true
    }
}, {
    _id: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

loanSchema.plugin(autoIncrement, {
    modelName: 'Loan',
    fieldName: '_id'
});
loanSchema.plugin(mongooseHidden);

module.exports = loanSchema;