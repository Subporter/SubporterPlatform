const mongoose = require('mongoose'),
    config = require('../../config/subporter.config'),
    cachegoose = require('cachegoose'),
    _ = require('lodash'),
    competitionSchema = require('../schemas/Competitions');

let redis = config.redis_dev;

if (process.env.NODE_ENV === 'production') {
    redis = config.redis_prod;
}

cachegoose(mongoose, redis);

let Competition = mongoose.model('Competition', competitionSchema, 'Competitions');

let populateSchema = {
    path: 'country sport'
};

/* Create */
Competition.addCompetition = function(body, cb) {
    let competition = new Competition(body);
    competition.save(function(err) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

/* Read (all competitions) */
Competition.getCompetitions = function(cb) {
    Competition.find({})
        .populate(populateSchema)
        .sort({
            country: 1,
            sport: 1,
            name: 1
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

Competition.getCompetitionsByCountry = function(country, cb) {
    Competition.find({
            country: country
        })

        .populate(populateSchema)
        .sort({
            sport: 1,
            name: 1
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

Competition.getCompetitionsBySport = function(sport, cb) {
    Competition.find({
            sport: sport
        })
        .populate(populateSchema)
        .sort({
            country: 1,
            name: 1
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

Competition.getCompetitionsByCountryAndSport = function(country, sport, cb) {
    Competition.find({
            country: country,
            sport: sport
        })
        .populate(populateSchema)
        .sort({
            name: 1
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

/* Read (one competition) */
Competition.getCompetitionById = function(id, cb) {
    Competition.findById(id)
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
Competition.updateCompetition = function(competition, body, cb) {
    _.merge(competition, body);
    competition.save(function(err) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

/* Delete */
Competition.deleteCompetition = function(id, cb) {
    Competition.findById(id, function(err, docs) {
        if (err || !docs) {
            cb(err);
        } else {
            docs.remove(cb);
        }
    });
};

Competition.deleteCompetitionsByCountry = function(country, cb) {
    Competition.find({
        country: country
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

Competition.deleteCompetitionsBySport = function(sport, cb) {
    Competition.find({
        sport: sport
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

module.exports = Competition;