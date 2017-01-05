const mongoose = require('mongoose'),
	config = require('../../config/subporter.config'),
	cachegoose = require('cachegoose'),
    _ = require('lodash'),
    addressSchema = require('../schemas/Addresses');

let redis = config.redis_dev;

if (process.env.NODE_ENV === 'production') {
    redis = config.redis_prod;
}

cachegoose(mongoose, redis);
let Address = mongoose.model('Address', addressSchema, 'Addresses');

let populateSchema = {
    path: 'country'
};

/* Create */
Address.addAddress = function(body, cb) {
    let address = new Address(body);
    address.save(function(err) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

/* Read (all addresses) */
Address.getAddresses = function(cb) {
    Address.find({})
        .populate(populateSchema)
        .sort({
            country: 1,
            postal: 1,
            city: 1,
            street: 1,
            number: 1
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

Address.getAddressesByCountry = function(country, cb) {
    Address.find({
            country: country
        })
        .populate(populateSchema)
        .sort({
            postal: 1,
            city: 1,
            street: 1,
            number: 1
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

/* Read (one address) */
Address.getAddressById = function(id, cb) {
    Address.findById(id)
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
Address.updateAddress = function(address, body, cb) {
    _.merge(address, body);
    address.save(function(err) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

/* Delete */
Address.deleteAddress = function(id, cb) {
    Address.findById(id, function(err, docs) {
        if (err || !docs) {
            cb(err);
        } else {
            docs.remove(cb);
        }
    });
};

/* Create or update */
Address.addOrUpdateAddress = function(id, body, cb) {
    if (id === -1) {
        let address = new Address(body);
        address.save(function(err, docs) {
            if (err || !docs) {
                cb(err, null);
            } else {
                cb(null, docs._id);
            }
        });
    } else {
        Address.findById(id, function(err, docs) {
            if (err || !docs) {
                cb(err, null);
            } else {
                _.merge(docs, body);
                docs.save(function(err, docs) {
                    if (err || !docs) {
                        cb(err, null);
                    } else {
                        cb(null, docs._id);
                    }
                });
            }
        });
    }
};

module.exports = Address;