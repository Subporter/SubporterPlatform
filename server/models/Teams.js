const mongoose = require('mongoose'),
	teamSchema = require('../schemas/Teams');

let Team = mongoose.model('Team', teamSchema, 'Teams');

module.exports = Team;