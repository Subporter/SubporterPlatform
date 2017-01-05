const mongoose = require('mongoose'),
    config = require('../../config/subporter.config'),
    cachegoose = require('cachegoose'),
    _ = require('lodash'),
    countrySchema = require('../schemas/Countries');

let redis = config.redis_dev;

if (process.env.NODE_ENV === 'production') {
    redis = config.redis_prod;
}

cachegoose(mongoose, redis);

let Country = mongoose.model('Country', countrySchema, 'Countries');

/* Create */
Country.addCountry = function(body, cb) {
    let country = new Country(body);
    country.save(function(err) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

/* Read (all countries) */
Country.getCountries = function(cb) {
    Country.find({})
        .sort('name')
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        })
        .cache();
};

/* Read (one sport) */
Country.getCountryById = function(id, cb) {
    Country.findById(id, function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        })
        .cache();
};

/* Update */
Country.updateCountry = function(country, body, cb) {
    _.merge(country, body);
    country.save(function(err) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

/* Delete */
Country.deleteCountry = function(id, cb) {
    Country.findById(id, function(err, docs) {
        if (err || !docs) {
            cb(err);
        } else {
            docs.remove(cb);
        }
    });
};

module.exports = Country;