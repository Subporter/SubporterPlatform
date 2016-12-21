const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')(),
    autoIncrement = require('mongoose-sequence');

let streetRegExp = /^.{1,100}$/;

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
        }
    });