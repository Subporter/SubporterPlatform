const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')({
        defaultHidden: {
            __v: true
        }
    }),
    autoIncrement = require('mongoose-increment');

let regExp = /^[A-zÀ-ÿ-\s]{2,100}$/;

let countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
		unique: true,
        match: regExp
    }
}, {
    _id: false
});

countrySchema.plugin(autoIncrement, {
    modelName: 'Country',
    fieldName: '_id'
});
countrySchema.plugin(mongooseHidden);

module.exports = countrySchema;