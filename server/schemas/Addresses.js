const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')({
        defaultHidden: {
            __v: true
        }
    }),
    autoIncrement = require('mongoose-increment');

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
		type: Number,
        ref: 'Country',
        required: true
    }
}, {
    _id: false
});

addressSchema.plugin(autoIncrement, {
    modelName: 'Address',
    fieldName: '_id'
});
addressSchema.plugin(mongooseHidden);

module.exports = addressSchema;