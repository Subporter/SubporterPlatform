const mongoose = require('mongoose'),
    _ = require('lodash'),
    competitionSchema = require('../schemas/Competitions');

let Competition = mongoose.model('Competition', competitionSchema, 'Competitions');

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
        .populate({
            path: 'country sport'
        })
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
        });
};

Competition.getCompetitionsByCountry = function(country, cb) {
    Competition.find({
            country: country
        })
        .populate({
            path: 'country sport'
        })
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
        });
};

Competition.getCompetitionsBySport = function(sport, cb) {
    Competition.find({
            sport: sport
        })
        .populate({
            path: 'country sport'
        })
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
        });
};

Competition.getCompetitionsByCountryAndSport = function(country, sport, cb) {
    Competition.find({
            country: country,
            sport: sport
        })
        .populate({
            path: 'country sport'
        })
        .sort({
            name: 1
        })
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        });
};

/* Read (one competition) */
Competition.getCompetitionById = function(id, cb) {
    Competition.findById(id)
        .populate({
            path: 'country sport'
        })
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        });
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
    Competition.findByIdAndRemove(id, function(err) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

Competition.deleteCompetitionsByCountry = function(country, cb) {
    Competition.remove({
        country: country
    }, function(err) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

Competition.deleteCompetitionsBySport = function(sport, cb) {
    Competition.remove({
        sport: sport
    }, function(err) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

module.exports = Competition;