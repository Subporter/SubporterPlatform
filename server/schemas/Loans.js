const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')({
        defaultHidden: {
            __v: true,
            created_at: true,
            updated_at: true
        }
    }),
    autoIncrement = require('mongoose-increment'),
    Game = require('../models/Games'),
    User = require('../models/Users');

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
    lent: {
        type: Boolean,
        required: true,
        default: false
    },
    lent_on: {
        type: Date
    },
    lent_out_by: {
        type: Number,
        ref: 'User',
        required: true
    },
    lent_by: {
        type: Number,
        ref: 'User'
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
    _id: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

loanSchema.pre('remove', function(next) {
    let loan = this;
    User.getUserByIdForAuth(loan.lent_out_by, function(err, docs) {
        if (err || !docs) {
            return next(err);
        } else {
            Game.deleteGame(loan.game, docs, function(err) {
                if (err) {
                    return next(err);
                } else {
                    return next(null);
                }
            });
        }
    });
});

loanSchema.plugin(autoIncrement, {
    modelName: 'Loan',
    fieldName: '_id'
});
loanSchema.plugin(mongooseHidden);

module.exports = loanSchema;