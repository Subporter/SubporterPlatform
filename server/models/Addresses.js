const mongoose = require('mongoose'),
    _ = require('lodash'),
    addressSchema = require('../schemas/Addresses');

let Address = mongoose.model('Address', addressSchema, 'Addresses');

/* Create */
Address.addAddress = function(body, cb) {
    let address = new Address(body);
    address.save(function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

/* Read (all addresses) */
Address.getAddresses = function(cb) {
    Address.find({}).populate('country').sort({
        country: 1,
        postal: 1,
        city: 1,
        street: 1,
        number: 1
    }).exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

/* Read (one address) */
Address.getAddressById = function(id, cb) {
    Address.findById(id).populate('country').exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

/* Update */
Address.updateAddress = function(address, body, cb) {
    _.merge(address, body);

    address.save(function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

/* Delete */
Address.deleteAddress = function(id, cb) {
    Address.findByIdAndRemove(id, function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

/* Create or update */
Address.addOrUpdateAddress = function (body, cb) {
    if (body.address === -1) {
        let address = new Address(body);
        address.save(function(err, docs) {
            if (err) {
                cb(err, null);
            }
            cb(null, docs._id);
        });
    } else {
        Address.findByIdAndUpdate(body.address, body, function (err, docs) {
            if (err) {
                cb(err, null);
            }
            cb(null, docs._id);
        });
    }
};

module.exports = Address;