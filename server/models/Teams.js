const mongoose = require('mongoose'),
    _ = require('lodash'),
    teamSchema = require('../schemas/Teams');

let Team = mongoose.model('Team', teamSchema, 'Teams');

/* Create */
Team.addTeam = function(body, cb) {
    let team = new Team(body);
    team.save(function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

/* Read (all teams) */
Team.getTeams = function(cb) {
    Team.find({}).populate({
        path: 'address competition',
        populate: [{
            path: 'country',
            model: 'Country'
        }, {
            path: 'sport',
            model: 'Sport'
        }]
    }).sort({
        name: 1
    }).exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

Team.getTeamsByCompetition = function(competition, cb) {
    Team.find({
        competition: competition
    }).populate({
        path: 'address competition',
        populate: [{
            path: 'country',
            model: 'Country'
        }, {
            path: 'sport',
            model: 'Sport'
        }]
    }).sort({
        name: 1
    }).exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

/* Read (one team) */
Team.getTeamById = function(id, cb) {
    Team.findById(id).populate({
        path: 'address competition',
        populate: [{
            path: 'country',
            model: 'Country'
        }, {
            path: 'sport',
            model: 'Sport'
        }]
    }).exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

/* Update */
Team.updateTeam = function(team, body, cb) {
    _.merge(team, body);

    team.save(function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

/* Delete */
Team.deleteTeam = function(id, cb) {
    Team.findByIdAndRemove(id, function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

module.exports = Team;