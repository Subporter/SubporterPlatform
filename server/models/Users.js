const mongoose = require('mongoose'),
    config = require('../../config/subporter.config'),
    cachegoose = require('cachegoose'),
    _ = require('lodash'),
    userSchema = require('../schemas/Users');

let redis = config.redis_dev;

if (process.env.NODE_ENV === 'production') {
    redis = config.redis_prod;
}

cachegoose(mongoose, redis);

let User = mongoose.model('User', userSchema, 'Users');

let populateSchema = [{
    path: 'address',
    model: 'Address',
    populate: [{
        path: 'country',
        model: 'Country'
    }]
}, {
    path: 'favorites',
    model: 'Team',
    populate: [{
        path: 'competition',
        model: 'Competition',
        populate: [{
            path: 'country',
            model: 'Country'
        }, {
            path: 'sport',
            model: 'Sport'
        }]
    }, {
        path: 'address',
        model: 'Address',
        populate: [{
            path: 'country',
            model: 'Country'
        }]
    }]
}, {
    path: 'subscriptions',
    model: 'Subscription',
    populate: [{
        path: 'team',
        model: 'Team',
        populate: [{
            path: 'address',
            model: 'Address',
            populate: [{
                path: 'country',
                model: 'Country'
            }]
        }, {
            path: 'competition',
            model: 'Competition',
            populate: [{
                path: 'country',
                model: 'Country'
            }, {
                path: 'sport',
                model: 'Sport'
            }]
        }]
    }]
}];

/* Create */
User.addUser = function(body, cb) {
    let user = new User(body);
    user.save(function(err, docs) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, docs);
        }
    });
};

/* Read (all users) */
User.getUsers = function(cb) {
    User.find({})
        .populate(populateSchema)
        .sort('username')
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        })
        .cache();
};

/* Read (one user) */
User.getUserById = function(id, cb) {
    User.findById(id)
        .populate(populateSchema)
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        })
        .cache();
};

User.getUserByIdForLogin = function(id, cb) {
    User.findById(id, {
            password: 1,
            email: 1
        })
        .populate(populateSchema)
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        })
        .cache();
};

User.getUserByIdForAuth = function(id, cb) {
    User.findById(id, {
            admin: 1,
            email: 1
        })
        .populate(populateSchema)
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        })
        .cache();
};

User.getUserByEmail = function(email, cb) {
    User.findOne({
            email: email
        })
        .populate(populateSchema)
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        })
        .cache();
};

User.getUserByEmailForLogin = function(email, cb) {
    User.findOne({
            email: email
        }, {
            password: 1,
            email: 1
        })
        .populate(populateSchema)
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        })
        .cache();
};

User.getUserByEmailForAuth = function(email, cb) {
    User.findOne({
            email: email
        }, {
            admin: 1,
            email: 1
        })
        .populate(populateSchema)
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        })
        .cache();
};

User.getUserByUsername = function(username, cb) {
    User.findOne({
            username: username
        })
        .populate(populateSchema)
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        })
        .cache();
};

User.getUserByUsernameForLogin = function(username, cb) {
    User.findOne({
            username: username
        }, {
            password: 1,
            email: 1
        })
        .populate(populateSchema)
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        })
        .cache();
};

User.getUserByUsernameForAuth = function(username, cb) {
    User.findOne({
            username: username
        }, {
            admin: 1,
            email: 1
        })
        .populate(populateSchema)
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        })
        .cache();
};

/* Favorites */
User.toggleFavorite = function(user, favorite, cb) {
    user.favorites.toggleAndSort(favorite);
    user.save(function(err, docs) {
        if (err || !docs) {
            cb(err, null);
        } else {
            User.populate(docs, populateSchema, function(err, docs) {
                if (err || !docs) {
                    cb(err, null);
                } else {
                    cb(null, docs);
                }
            });
        }
    });
};

/* Subscriptions */
User.toggleSubscription = function(user, subscription, cb) {
    user.subscriptions.toggleAndSort(subscription);
    user.save(function(err, docs) {
        if (err || !docs) {
            cb(err, null);
        } else {
            User.populate(docs, populateSchema, function(err, docs) {
                if (err || !docs) {
                    cb(err, null);
                } else {
                    cb(null, docs);
                }
            });
        }
    });
};

/* Helper */
Array.prototype.toggleAndSort = function(value) {
    let i = this.findIndex(item => item._id === value);

    if (i === -1) {
        this.push(value);
    } else {
        this.splice(i, 1);
    }

    this.sort(function(a, b) {
        return a - b;
    });
};

/* Update */
User.updateUser = function(user, body, cb) {
    body.email = user.email;
    body.username = user.username;
    _.merge(user, body);
    user.admin = false;
    user.save(function(err) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

User.updateCrucial = function(user, body, cb) {
    _.merge(user, body);
    user.admin = false;
    user.save(function(err) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

/* Delete */
User.deleteUser = function(id, cb) {
    User.findById(id, function(err, docs) {
        if (err) {
            cb(err);
        } else {
            docs.remove(cb);
        }
    });
};

module.exports = User;