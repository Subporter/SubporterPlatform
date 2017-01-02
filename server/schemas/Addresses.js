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

let addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
		trim: true,
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
		trim: true,
        match: regExp
    },
    country: {
		type: Number,
        ref: 'Country',
        required: true
    }
}, {
    _id: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

addressSchema.plugin(mongooseHidden);
addressSchema.plugin(autoIncrement, {
    modelName: 'Address',
    fieldName: '_id'
});

module.exports = addressSchema;