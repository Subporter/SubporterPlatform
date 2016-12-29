const mongoose = require('mongoose'),
    _ = require('lodash'),
    countrySchema = require('../schemas/Countries'),
    Competition = require('../models/Competitions');

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
    Country.find({}).sort('name').exec(function(err, docs) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

/* Read (one sport) */
Country.getCountryById = function(id, cb) {
    Country.findById(id, function(err, docs) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
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
    Competition.deleteCompetitionsByCountry(id, function(err) {
        if (err) {
            cb(err);
        } else {
            Country.findByIdAndRemove(id, function(err) {
                if (err) {
                    cb(err);
                } else {
                    cb(null);
                }
            });
        }
    });
};

module.exports = Country;