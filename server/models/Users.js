const mongoose = require('mongoose'),
	mongooseHidden = require('mongoose-hidden')(),
	bcrypt = require('bcrypt-nodejs');

let userSchema = new mongoose.Schema({
	admin: {
		type: Boolean,
		default: false
	},
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
	country: String,
	phone: String,
	national_registry_number: String,
	sports_id: Number,
	competitions_id: Number,
	team_id: Number,
	password: {
		type: String,
		required: true
	}
});

userSchema.pre("save", function (next) {
	let user = this;
	if (this.isModified("password") || this.isNew) {
		bcrypt.genSalt(10, function (err, salt) {
			if (err) {
				return next(err);
			} else {
				bcrypt.hash(user.password, salt, null, function (err, hash) {
					if (err) {
						return next(err);
					} else {
						user.password = hash;
						return next();
					}
				});
			}
		});
	} else {
		return next();
	}
});

userSchema.methods.comparePassword = function (providedPassword, cb) {
	bcrypt.compare(providedPassword, this.password, function (err, isMatch) {
		if (err) {
			return cb(err);
		} else {
			cb(null, isMatch);
		}
	});
};

userSchema.plugin(mongooseHidden);

module.exports = mongoose.model('User', userSchema);