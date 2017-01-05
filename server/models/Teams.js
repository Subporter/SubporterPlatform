const mongoose = require('mongoose'),
    config = require('../../config/subporter.config'),
    cachegoose = require('cachegoose'),
    _ = require('lodash'),
    teamSchema = require('../schemas/Teams'),
    Subscription = require('../models/Subscriptions'),
    Game = require('../models/Games');

let redis = config.redis_dev;

if (process.env.NODE_ENV === 'production') {
    redis = config.redis_prod;
}

cachegoose(mongoose, redis);

let Team = mongoose.model('Team', teamSchema, 'Teams');

let populateSchema = [{
    path: 'address',
    model: 'Address',
    populate: [{
        path: 'country',
        model: 'Country'
    }]
}, {
    path: 'competition',
    model: 'Competition',
    populate: [{
        path: 'country',
        model: 'Country'
    }, {
        path: 'sport',
        model: 'Sport'
    }]
}];

/* Create */
Team.addTeam = function(body, cb) {
    let team = new Team(body);
    team.save(function(err) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

/* Read (all teams) */
Team.getTeams = function(cb) {
    Team.find({})
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

Team.getTeamsByCompetition = function(competition, cb) {
    Team.find({
            competition: competition
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

/* Read (one team) */
Team.getTeamById = function(id, cb) {
    Team.findById(id)
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
Team.updateTeam = function(team, body, cb) {
    _.merge(team, body);
    team.save(function(err) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

/* Delete */
Team.deleteTeam = function(id, cb) {
    Team.findById(id, function(err, docs) {
        if (err || !docs) {
            cb(err);
        } else {
            docs.remove(cb);
        }
    });
};

Team.deleteTeamReferences = function(id, cb) {
    Team.findById(id, function(err, docs) {
        if (err || !docs) {
            cb(err);
        } else {
            Subscription.deleteSubscriptionsByTeam(docs._id, function(err) {
                if (err) {
                    cb(err);
                } else {
                    Game.deleteGamesByTeam(docs._id, function(err) {
                        if (err) {
                            cb(err);
                        } else {
                            cb(null);
                        }
                    });
                }
            });
        }
    });
};

Team.deleteTeamsByCompetition = function(competition, cb) {
    Team.find({
        competition: competition
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

module.exports = Team;