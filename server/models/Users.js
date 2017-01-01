const mongoose = require('mongoose'),
    _ = require("lodash"),
    userSchema = require('../schemas/Users');

let User = mongoose.model('User', userSchema, 'Users');

let populateSchema = [{
    path: 'address',
    model: 'Address',
    populate: [{
        path: 'country',
        model: 'Country'
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
}, {
    path: 'favorites',
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
    User.find({}, {
            admin: 0,
            password: 0
        })
        .populate(populateSchema)
        .sort('username')
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        });
};

/* Read (one user) */
User.getUserById = function(id, cb) {
    User.findById(id, {
            admin: 0,
            password: 0
        })
        .populate(populateSchema)
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        });
};

User.getUserByIdForAuth = function(id, cb) {
    User.findById(id, {
            password: 0
        })
        .populate(populateSchema)
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        });
};

User.getUserByEmail = function(email, cb) {
    User.findOne({
            email: email
        }, {
            admin: 0,
            password: 0
        })
        .populate(populateSchema)
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        });
};

User.getUserByEmailForLogin = function(email, cb) {
    User.findOne({
            email: email
        }, {
            admin: 0
        })
        .populate(populateSchema)
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        });
};

User.getUserByEmailForAuth = function(email, cb) {
    User.findOne({
            email: email
        }, {
            password: 0
        })
        .populate(populateSchema)
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        });
};

User.getUserByUsername = function(username, cb) {
    User.findOne({
            username: username
        }, {
            admin: 0,
            password: 0
        })
        .populate(populateSchema)
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        });
};

/* Subscriptions */
User.toggleSubscription = function(user, subscription, cb) {
    let i = user.subscriptions.findIndex(item => item._id === subscription);
    if (i === -1) {
        user.subscriptions.push(subscription);
    } else {
        user.subscriptions.splice(i, 1);
    }
    user.subscriptions.sort(function(a, b) {
        return a - b;
    });
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

/* Favorites */
User.toggleFavorite = function(user, favorite, cb) {
    let i = user.favorites.findIndex(item => item._id === favorite);
    if (i === -1) {
        user.favorites.push(favorite);
    } else {
        user.favorites.splice(i, 1);
    }
    user.favorites.sort(function(a, b) {
        return a - b;
    });
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