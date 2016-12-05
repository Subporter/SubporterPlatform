const mongoose = require('mongoose'),
	crypto = require('crypto'),
	jwt = require('jsonwebtoken'),
	config = require('../../config/subporter.config');

let userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	username: {
		type: String,
		unique: true,
		required: true
	},
	name: String,
	firstname: String,
	date_of_birth: String,
	street: String,
	city: String,
	postal: String,
	phone: String,
	national_registry_number: {
		type: String,
		unique: true
	},
	sports_id: Number,
	team_id: Number,
	hash: String,
	salt: String
});

userSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function (password) {
	let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return this.hash === hash;
};

userSchema.methods.generateJWT = function () {
	let expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		exp: parseInt(expiry.getTime() / 1000),
	}, config.jwt_secret);
};

module.exports = mongoose.model('User', userSchema);