const mongoose = require('mongoose'),
	addressSchema = require('../schemas/Addresses');

let Address = mongoose.model('Address', addressSchema, 'Addresses');

module.exports = Address;