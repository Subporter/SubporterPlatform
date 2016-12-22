const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')(),
    bcrypt = require('bcrypt-nodejs'),
    teamSchema = require('./Teams'),
    subscriptionSchema = require('./Subscriptions');

let regExp = /^[A-zÀ-ÿ-\s]{2,100}$/;
let emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let usernameRegExp = /^[A-zÀ-ÿ0-9-_]{3,20}$/;
let phoneRegExp = /^((\+|00)32\s?|0)4(60|[789]\d)(\s?\d{2}){3}$/;
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
        required: true,
        match: regExp
    },
    firstname: {
        type: String,
        required: true,
        match: regExp
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
    subscriptions: [
        subscriptionSchema
    ],
    favorites: [
        teamSchema
    ],
    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", function(next) {
    let user = this;
    if (this.isModified("password") || this.isNew) {
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

userSchema.methods.comparePassword = function(providedPassword, cb) {
    bcrypt.compare(providedPassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
};

userSchema.plugin(mongooseHidden);

module.exports = userSchema;