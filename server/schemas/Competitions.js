const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')({
        defaultHidden: {
            __v: true,
			created_at: true,
            updated_at: true
        }
    }),
    autoIncrement = require('mongoose-increment');

let regExp = /^[A-zÀ-ÿ-\s]{2,100}$/;
let descriptionRegExp = /^[A-zÀ-ÿ0-9-\s.,!"'/]{2,1000}$/;

let competitionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: regExp
    },
    description: {
        type: String,
        required: true,
        match: descriptionRegExp
    },
    country: {
        type: Number,
        ref: 'Country',
        required: true
    },
    sport: {
        type: Number,
        ref: 'Sport',
        required: true
    }
}, {
	_id: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

competitionSchema.plugin(mongooseHidden);
competitionSchema.plugin(autoIncrement, {
	modelName: 'Competition',
	fieldName: '_id'
});

module.exports = competitionSchema;