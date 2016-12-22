const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')(),
    autoIncrement = require('mongoose-sequence');

let regExp = /^[A-zÀ-ÿ-\s]{2,100}$/;
let descriptionRegExp = /^[A-zÀ-ÿ0-9-\s]{2,1000}$/;

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
    sport: {
        type: mongoose.Schema.ObjectId,
        ref: 'Sport',
        required: true
    },
	country: {
        type: mongoose.Schema.ObjectId,
        ref: 'Country',
        required: true
    }
});

competitionSchema.plugin(autoIncrement, {
    inc_field: "competitions_id"
});
competitionSchema.plugin(mongooseHidden);

module.exports = competitionSchema;