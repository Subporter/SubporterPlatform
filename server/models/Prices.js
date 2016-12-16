const mongoose = require('mongoose'),
	mongooseHidden = require('mongoose-hidden')(),
	autoIncrement = require('mongoose-sequence');

let priceSchema = new mongoose.Schema({
	team_id: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

priceSchema.plugin(autoIncrement, { inc_field: "prices_id" });
priceSchema.plugin(mongooseHidden);

module.exports = mongoose.model('Price', priceSchema);