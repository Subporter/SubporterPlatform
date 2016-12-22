const mongoose = require('mongoose'),
	userSchema = require('../schemas/Users');

let User = mongoose.model('User', userSchema, 'Users');

module.exports = User;