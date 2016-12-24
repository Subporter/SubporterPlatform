const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')(),
    autoIncrement = require('mongoose-sequence');

let regExp = /^[A-zÀ-ÿ-\s]{2,100}$/;

let sportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        match: regExp
    }
});

sportSchema.plugin(autoIncrement, {
    inc_field: "sports_id"
});
sportSchema.plugin(mongooseHidden);

module.exports = sportSchema;