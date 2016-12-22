const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')(),
    autoIncrement = require('mongoose-sequence');

let streetRegExp = /^[a-zA-Z]{1,100}$/;
let cityRegExp = /^[a-zA-Z]{1,50}$/;
let countryRegExp = /^[a-zA-Z]{1,50}$/;

let addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
        match: streetRegExp
    },
    number: {
        type: Number,
        required: true,
        min: 0,
        max: 999999
    },
    postal: {
        type: Number,
        required: true,
        min: 0,
        max: 999999
    },
    city: {
        type: String,
        required: true,
        match: cityRegExp
    },
    country: {
        type: String,
        required: true,
        match: countryRegExp
    }
});

addressSchema.plugin(autoIncrement, {
    inc_field: 'addresses_id'
});
addressSchema.plugin(mongooseHidden);

module.exports = mongoose.model('Address', addressSchema);