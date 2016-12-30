const mongoose = require('mongoose'),
    _ = require('lodash'),
    gameSchema = require('../schemas/Games');

let Game = mongoose.model('Game', gameSchema, 'Games');

let populateSchema = [{
    path: 'home',
    model: 'Team',
    populate: [{
        path: 'address',
        model: 'Address',
        populate: [{
            path: 'country',
            model: 'Country'
        }]
    }]
}, {
    path: 'away',
    model: 'Team',
    populate: [{
        path: 'address',
        model: 'Address',
        populate: [{
            path: 'country',
            model: 'Country'
        }]
    }]
}];

/* Create */
Game.addGame = function(body, cb) {
    let game = new Game(body);
    game.save(function(err) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

/* Read (all games) */
Game.getGames = function(cb) {
    Game.find({})
        .populate(populateSchema)
        .sort({
            date: 1,
            home: 1,
            away: 1
        })
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        });
};

/* Read (one game) */
Game.getGameById = function(id, cb) {
    Game.findById(id)
        .populate(populateSchema)
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        });
};

/* Update */
Game.updateGame = function(game, body, cb) {
    _.merge(game, body);

    game.save(function(err) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

/* Delete */
Game.deleteGame = function(id, user, cb) {
    Game.findById(id, function(err, docs) {
        if (err || !docs || (user.admin === false && user._id !== docs.user)) {
            cb(err);
        } else {
            docs.remove(cb);
        }
    });
};

Game.deleteGamesByTeam = function(team, cb) {
    Game.find({
        team: team
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

module.exports = Game;