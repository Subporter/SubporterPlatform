const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')(),
    autoIncrement = require('mongoose-sequence');

let regExp = /^[A-zÀ-ÿ-\s]{2,100}$/;

let addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
        match: regExp
    },
    number: {
        type: Number,
        required: true,
        min: 1,
        max: 9999
    },
    postal: {
        type: Number,
        required: true,
        min: 1000,
        max: 9999
    },
    city: {
        type: String,
        required: true,
        match: regExp
    },
    country: {
		type: mongoose.Schema.ObjectId,
        ref: 'Country',
        required: true
    }
});

addressSchema.plugin(autoIncrement, {
    inc_field: 'addresses_id'
});
addressSchema.plugin(mongooseHidden);

module.exports = addressSchema;