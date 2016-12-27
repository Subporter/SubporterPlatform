const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')({
        defaultHidden: {
            __v: true
        }
    }),
    autoIncrement = require('mongoose-increment');

let regExp = /^[A-zÀ-ÿ-\s]{2,100}$/;

let sportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
		unique: true,
        match: regExp
    }
}, {
    _id: false
});

sportSchema.plugin(autoIncrement, {
    modelName: 'Sport',
    fieldName: '_id'
});
sportSchema.plugin(mongooseHidden);

module.exports = sportSchema;