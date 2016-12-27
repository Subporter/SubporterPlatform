const mongoose = require('mongoose'),
    _ = require("lodash"),
	countrySchema = require('../schemas/Countries');

let Country = mongoose.model('Country', countrySchema, 'Countries');

/* Create */
Country.addCountry = function(body, cb) {
    let country = new Country(body);
    country.save(function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

/* Read (all countries) */
Country.getCountries = function(cb) {
    Country.find({}).sort('name').exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

/* Read (one sport) */
Country.getCountryById = function(id, cb) {
    Country.findById(id, function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

/* Update */
Country.updateCountry = function (country, body, cb) {
    _.merge(country, body);

    country.save(function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

/* Delete */
Country.deleteCountry = function (id, cb) {
    Country.findByIdAndRemove(id, function (err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

module.exports = Country;