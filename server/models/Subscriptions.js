const mongoose = require('mongoose'),
    _ = require('lodash'),
    subscriptionSchema = require('../schemas/Subscriptions');

let Subscription = mongoose.model('Subscription', subscriptionSchema, 'Subscriptions');

/* Create */
Subscription.addSubscription = function(body, cb) {
    let subscription = new Subscription(body);
    subscription.save(function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

/* Read (all subscriptions) */
Subscription.getSubscriptions = function(body, cb) {
    Subscription.find({}).populate('team').sort({
        team: 1,
        place: 1
    }).exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

Subscription.getSubscriptionsByTeam = function(team, cb) {
    Subscription.find({
        team: team
    }).populate('team').sort({
        place: 1
    }).exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

/* Read (one subscription) */
Subscription.getSubscriptionById = function(id, cb) {
    Subscription.findById(id).populate('team').exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

/* Update */
Subscription.updateSubscription = function(subscription, body, cb) {
    _.merge(subscription, body);

    subscription.save(function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

/* Delete */
Subscription.deleteSubscription = function(id, cb) {
    Subscription.findByIdAndRemove(id, function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

module.exports = Subscription;