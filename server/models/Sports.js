const mongoose = require('mongoose'),
    _ = require('lodash'),
    sportSchema = require('../schemas/Sports');

let Sport = mongoose.model('Sport', sportSchema, 'Sports');

/* Create */
Sport.addSport = function(body, cb) {
    let sport = new Sport(body);
    sport.save(function(err) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

/* Read (all sports) */
Sport.getSports = function(cb) {
    Sport.find({})
        .sort('name')
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        });
};

/* Read (one sport) */
Sport.getSportById = function(id, cb) {
    Sport.findById(id, function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        });
};

/* Update */
Sport.updateSport = function(sport, body, cb) {
    _.merge(sport, body);
    sport.save(function(err) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

/* Delete */
Sport.deleteSport = function(id, cb) {
    Sport.findById(id, function(err, docs) {
        if (err || !docs) {
            cb(err);
        } else {
            docs.remove(cb);
        }
    });
};

module.exports = Sport;