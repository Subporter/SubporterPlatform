const mongoose = require('mongoose'),
	countrySchema = require('../schemas/Countries');

let Country = mongoose.model('Country', countrySchema, 'Countries');

module.exports = Country;