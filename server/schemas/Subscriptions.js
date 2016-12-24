const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')(),
    autoIncrement = require('mongoose-sequence');

let regExp = /^[A-zÀ-ÿ-\s]{2,100}$/;

let subscriptionSchema = new mongoose.Schema({
    place: {
        type: String,
        required: true
    },
    team: {
        type: mongoose.Schema.ObjectId,
        ref: 'Team',
        required: true
    }
});

subscriptionSchema.plugin(autoIncrement, {
    inc_field: "subscriptions_id"
});
subscriptionSchema.plugin(mongooseHidden);

module.exports = subscriptionSchema;