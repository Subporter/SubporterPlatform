const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')({
        defaultHidden: {
            __v: true
        }
    }),
    autoIncrement = require('mongoose-increment');

let regExp = /^[A-zÀ-ÿ-\s]{2,100}$/;

let subscriptionSchema = new mongoose.Schema({
    place: {
        type: String,
        required: true
    },
    team: {
        type: Number,
        ref: 'Team',
        required: true
    },
    user: {
        type: Number,
        ref: 'User',
        required: true
    }
}, {
    _id: false
});

subscriptionSchema.plugin(autoIncrement, {
	modelName: 'Subscription',
	fieldName: '_id'
});
subscriptionSchema.plugin(mongooseHidden);

module.exports = subscriptionSchema;