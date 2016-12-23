const mongoose = require('mongoose'),
	userSchema = require('../schemas/Users');

let User = mongoose.model('User', userSchema, 'Users');

User.statics.getUser = () => {
	
};

module.exports = User;