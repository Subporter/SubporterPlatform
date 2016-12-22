const mongoose = require('mongoose'),
	competitionSchema = require('../schemas/Competitions');

let Competition = mongoose.model('Competition', competitionSchema, 'Competitions');

module.exports = Competition;