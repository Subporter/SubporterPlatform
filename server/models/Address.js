const mongoose = require('mongoose'),
	mongooseHidden = require('mongoose-hidden')(),
	autoIncrement = require('mongoose-sequence');

let streetRegExp = /^.{1,35}$/;

let addressSchema = new mongoose.Schema({
	street: {
		type: String,
		required: true,
		match: streetRegExp
	}
});