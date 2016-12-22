const mongoose = require('mongoose'),
	sportSchema = require('../schemas/Sports');

let Sport = mongoose.model('Sport', sportSchema, 'Sports');

module.exports = Sport;