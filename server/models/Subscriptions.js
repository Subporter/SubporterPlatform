const mongoose = require('mongoose'),
    config = require('../../config/subporter.config'),
    cachegoose = require('cachegoose'),
    _ = require('lodash'),
    subscriptionSchema = require('../schemas/Subscriptions');

let redis = config.redis_dev;

if (process.env.NODE_ENV === 'production') {
    redis = config.redis_prod;
}

cachegoose(mongoose, redis);

let Subscription = mongoose.model('Subscription', subscriptionSchema, 'Subscriptions');

let populateSchema = [{
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
}, {
    path: 'user',
    model: 'User',
    populate: [{
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
    }]
}];

/* Create */
Subscription.addSubscription = function(body, cb) {
    let subscription = new Subscription(body);
    subscription.save(function(err, docs) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, docs._id);
        }
    });
};

/* Read (all subscriptions) */
Subscription.getSubscriptions = function(cb) {
    Subscription.find({})
        .populate(populateSchema)
        .sort({
            team: 1,
            user: 1,
            place: 1
        })
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        })
        .cache();
};

Subscription.getSubscriptionsByTeam = function(team, cb) {
    Subscription.find({
            team: team
        })
        .populate(populateSchema)
        .sort({
            user: 1,
            place: 1
        })
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        })
        .cache();
};

Subscription.getSubscriptionsByUser = function(user, cb) {
    Subscription.find({
            user: user
        })
        .populate(populateSchema)
        .sort({
            team: 1,
            place: 1
        })
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        })
        .cache();
};

/* Read (one subscription) */
Subscription.getSubscriptionById = function(id, cb) {
    Subscription.findById(id)
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

/* Update */
Subscription.updateSubscription = function(subscription, body, cb) {
    _.merge(subscription, body);
    subscription.save(function(err) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

/* Delete */
Subscription.deleteSubscription = function(id, user, cb) {
    Subscription.findById(id, function(err, docs) {
        if (err || !docs || (user.admin === false && user._id !== docs.user)) {
            cb(err);
        } else {
            docs.remove(cb);
        }
    });
};

Subscription.deleteSubscriptionsByTeam = function(team, cb) {
    Subscription.find({
        team: team
    }, function(err, docs) {
        if (err || docs.length === 0) {
            cb(err);
        } else {
            docs.forEach(function(doc) {
                doc.remove(cb);
            });
        }
    });
};

Subscription.deleteSubscriptionsByUser = function(user, cb) {
    Subscription.find({
        user: user
    }, function(err, docs) {
        if (err || docs.length === 0) {
            cb(err);
        } else {
            docs.forEach(function(doc) {
                doc.remove(cb);
            });
        }
    });
};

module.exports = Subscription;