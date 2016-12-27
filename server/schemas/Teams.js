const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')({
        defaultHidden: {
            __v: true
        }
    }),
    autoIncrement = require('mongoose-increment');

let regExp = /^[a-zA-Z]{1,100}$/;

let teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: regExp
    },
    stadion: {
        type: String,
        required: true,
        match: regExp
    },
	logo: {
		type: String,
		required: true
	},
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 99
    },
    address: {
        type: Number,
        ref: 'Address',
        required: true
    },
    sport: {
        type: Number,
        ref: 'Sport',
        required: true
    },
    competition: {
        type: Number,
        ref: 'Competition',
        required: true
    }
}, {
    _id: false
});

teamSchema.plugin(autoIncrement, {
	modelName: 'Team',
	fieldName: '_id'
});
teamSchema.plugin(mongooseHidden);

module.exports = teamSchema;