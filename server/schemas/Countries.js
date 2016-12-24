const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')(),
    autoIncrement = require('mongoose-sequence');

let regExp = /^[A-zÀ-ÿ-\s]{2,100}$/;

let countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
		unique: true,
        match: regExp
    }
});

countrySchema.plugin(autoIncrement, {
    inc_field: "countries_id"
});
countrySchema.plugin(mongooseHidden);

module.exports = countrySchema;