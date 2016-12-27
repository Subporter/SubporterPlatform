const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')({
        defaultHidden: {
            __v: true
        }
    }),
    autoIncrement = require('mongoose-increment'),
    bcrypt = require('bcrypt-nodejs'),
    teamSchema = require('./Teams'),
    subscriptionSchema = require('./Subscriptions');

let regExp = /^[A-zÀ-ÿ-\s]{2,100}$/;
let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let usernameRegExp = /^[A-Za-z0-9]{3,20}$/;
let phoneRegExp = /^((\+|00)32\s?|0)4(60|[789]\d)(\s?\d{2}){3}$/;
let registryRegExp = /^[0-9]{2}.[0-9]{2}.[0-9]{2}-[0-9]{3}.[0-9]{2}$/;

let userSchema = new mongoose.Schema({
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    password: {
        type: String,
        required: true
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
        required: true,
        match: regExp
    },
    firstname: {
        type: String,
        required: true,
        match: regExp
    },
    date_of_birth: {
		type: Date
	},
    national_registry_number: {
        type: String,
        match: registryRegExp
    },
	phone: {
		type: String,
		match: phoneRegExp,
	},
    address: {
        type: Number,
        ref: 'Address'
    },
    subscriptions: [
        subscriptionSchema
    ],
    favorites: [
        teamSchema
    ]
}, {
    _id: false
});

userSchema.pre("save", function(next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            } else {
                bcrypt.hash(user.password, salt, null, function(err, hash) {
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

userSchema.methods.comparePassword = function(providedPassword, actualPassword, cb) {
    bcrypt.compare(providedPassword, actualPassword, function(err, isMatch) {
        if (err) {
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
};

userSchema.plugin(autoIncrement, {
    modelName: 'User',
    fieldName: '_id'
});
userSchema.plugin(mongooseHidden);

module.exports = userSchema;