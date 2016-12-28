const mongoose = require('mongoose'),
    _ = require("lodash"),
    userSchema = require('../schemas/Users');

let User = mongoose.model('User', userSchema, 'Users');

/* Create */
User.addUser = function(body, cb) {
    let user = new User(body);
    user.save(function(err) {
        if (err) {
            cb(err, null);
        }
        cb(null, user);
    });
};

/* Read (all users) */
User.getUsers = function(cb) {
    User.find({}, {
        admin: 0,
        password: 0
    }).populate('address').sort('username').exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

/* Read (one user) */
User.getUserByEmail = function(email, cb) {
    User.findOne({
        email: email
    }, {
        admin: 0,
        password: 0
    }).exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

User.getUserByEmailForLogin = function(email, cb) {
    User.findOne({
        email: email
    }, {
        admin: 0
    }).exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

User.getUserByEmailForAuth = function(email, cb) {
    User.findOne({
        email: email
    }, {
        password: 0
    }).exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

User.getUserByUsername = function(username, cb) {
    User.findOne({
        username: username
    }, {
        admin: 0,
        password: 0
    }).exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

/* Add */
User.addFavorite = function(user, favorite, cb) {
	user.favorites.push(favorite);

	user.save(function (err) {
		if (err) {
			cb(err);
		}
		cb (null);
	});
};

User.addSubscription = function(user, subscription, cb) {
    user.subscriptions.push(subscription);

	user.save(function (err) {
		if (err) {
			cb(err);
		}
		cb (null);
	});
};

/* Delete */

/* Update */
User.updateUser = function(user, body, cb) {
    body.email = user.email;
    body.username = user.username;

    _.merge(user, body);
    user.admin = false;

    user.save(function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

User.updateCrucial = function(user, body, cb) {
    _.merge(user, body);
    user.admin = false;

    user.save(function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

/* Delete */
User.deleteUser = function(username, cb) {
    User.findOneAndRemove({
        username: username
    }, function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

module.exports = User;