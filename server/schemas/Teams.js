const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')({
        defaultHidden: {
            __v: true,
			created_at: true,
            updated_at: true
        }
    }),
    autoIncrement = require('mongoose-increment'),
	Address = require('../models/Addresses'),
    Subscription = require('../models/Subscriptions'),
	Game = require('../models/Games');

let regExp = /^[A-zÀ-ÿ0-9-\s]{2,100}$/;

let teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
		trim: true,
        match: regExp
    },
    stadion: {
        type: String,
        required: true,
		trim: true,
        match: regExp
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 99
    },
    logo: {
		type: String,
		required: true,
		trim: true
	},
    address: {
        type: Number,
        ref: 'Address',
        required: true
    },
    competition: {
        type: Number,
        ref: 'Competition',
        required: true
    }
}, {
    _id: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


teamSchema.pre('remove', function (next) {
    let team = this;
    Address.deleteAddress(team.address, function (err) {
        if (err) {
            return next(err);
        } else {
            Subscription.deleteSubscriptionsByTeam(team._id, function (err) {
                if (err) {
                    return next(err);
                } else {
                    Game.deleteGamesByTeam(team._id, function (err) {
                        if (err) {
                            return next(err);
                        } else {
                            return next(null);
                        }
                    });
                }
            });
        }
    });
});

teamSchema.plugin(autoIncrement, {
	modelName: 'Team',
	fieldName: '_id'
});
teamSchema.plugin(mongooseHidden);

module.exports = teamSchema;