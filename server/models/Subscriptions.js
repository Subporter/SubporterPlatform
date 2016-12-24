const mongoose = require('mongoose'),
	subscriptionSchema = require('../schemas/Subscriptions');

let Subscription = mongoose.model('Subscription', subscriptionSchema, 'Subscriptions');

module.exports = Subscription;