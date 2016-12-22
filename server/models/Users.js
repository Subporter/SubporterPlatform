const mongoose = require('mongoose'),
	mongooseHidden = require('mongoose-hidden')(),
	bcrypt = require('bcrypt-nodejs'),
	favoriteSchema = require('./Favorites');

let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let usernameRegExp = /^[a-zA-Z0-9_.-]{3,50}$/;
let nameRegExp = /^[a-zA-Z]{2,50}$/;
let firstnameRegExp = /^[a-zA-Z]{2,50}$/;
let phoneRegExp;
let registryRegExp = /^[0-9]{2}.[0-9]{2}.[0-9]{2}-[0-9]{3}.[0-9]{2}$/;

let userSchema = new mongoose.Schema({
	admin: {
		type: Boolean,
		required: true,
		default: false
	},
	email: {
		type: String,
		unique: true,
		required: true,
		match: emailRegExp
	},
	username: {
		type: String,
		unique: true,
		required: true,
		match: usernameRegExp
	},
	name: {
		type: String,
		match: nameRegExp
	},
	firstname: {
		type: String,
		match: firstnameRegExp
	},
	date_of_birth: Date,
	address: {
        type: mongoose.Schema.ObjectId,
        ref: 'Address',
        required: true
    },
	phone: {
		type: String,
		match: phoneRegExp,
	},
	national_registry_number: {
		type: String,
		match: registryRegExp
	},
	favorites: [
		
	],
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