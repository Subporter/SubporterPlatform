const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')({
        defaultHidden: {
            __v: true,
            created_at: true,
            updated_at: true,
            admin: true,
            password: true
        }
    }),
    autoIncrement = require('mongoose-increment'),
    bcrypt = require('bcrypt-nodejs');

const regExp = /^[A-zÀ-ÿ-\s]{2,100}$/;
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const usernameRegExp = /^[A-Za-z0-9]{3,20}$/;
const phoneRegExp = /^((\+|00)32\s?|0)4(60|[789]\d)(\s?\d{2}){3}$/;
const registryRegExp = /^[0-9]{2}.[0-9]{2}.[0-9]{2}-[0-9]{3}.[0-9]{2}$/;

const userSchema = new mongoose.Schema({
    address: {
        type: Number,
        ref: 'Address'
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    avatar: {
        type: String,
        required: true,
        default: '/img/avatar.png'
    },
    date_of_birth: {
        type: Date
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: emailRegExp
    },
    favorites: [{
        type: Number,
        ref: 'Team'
    }],
    firstname: {
        type: String,
        required: true,
        match: regExp
    },
    joined_on: {
        type: Date,
        required: true,
        default: Date.now
    },
    name: {
        type: String,
        required: true,
        match: regExp
    },
    national_registry_number: {
        type: String,
        match: registryRegExp
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        match: phoneRegExp,
    },
    subscriptions: [{
        type: Number,
        ref: 'Subscription'
    }],
    username: {
        type: String,
        unique: true,
        required: true,
        match: usernameRegExp
    }
}, {
    _id: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

userSchema.pre('save', function(next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return next(err);
            } else {
                bcrypt.hash(user.password, salt, null, (err, hash) => {
                    if (err) {
                        return next(err);
                    } else {
                        user.password = hash;
                        return next(null);
                    }
                });
            }
        });
    } else {
        return next();
    }
});

userSchema.pre('remove', function(next) {
    const Address = require('../models/Addresses'),
        Subscription = require('../models/Subscriptions'),
        Loan = require('../models/Loans');

    let user = this;
    Address.deleteAddress(user.address, (err) => {
        if (err) {
            return next(err);
        } else {
            Subscription.deleteSubscriptionsByUser(user._id, (err) => {
                if (err) {
                    return next(err);
                } else {
                    Loan.deleteLoansByUser(user._id, (err) => {
                        if (err) {
                            return next(err);
                        } else {
                            return next(null);
                        }
                    });
                }
            });
        }
    });
});

userSchema.methods.comparePassword = (providedPassword, actualPassword, next) => {
    bcrypt.compare(providedPassword, actualPassword, (err, isMatch) => {
        if (err) {
            return next(err, null);
        } else {
            return next(null, isMatch);
        }
    });
};

userSchema.plugin(autoIncrement, {
    modelName: 'User',
    fieldName: '_id'
});
userSchema.plugin(mongooseHidden);

module.exports = userSchema;