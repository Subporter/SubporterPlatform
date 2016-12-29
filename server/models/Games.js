const mongoose = require('mongoose'),
    _ = require('lodash'),
    gameSchema = require('../schemas/Games');

let Game = mongoose.model('Game', gameSchema, 'Games');

/* Create */
Game.addGame = function(body, cb) {
    let game = new Game(body);
    game.save(function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

/* Read (all games) */
Game.getGames = function(cb) {
    Game.find({}).populate('home away').exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

/* Read (one game) */
Game.getGameById = function(id, cb) {
    Game.findById(id).populate('home away').exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

/* Update */
Game.updateGame = function(Game, body, cb) {
    _.merge(Game, body);

    Game.save(function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

/* Delete */
Game.deleteGame = function(id, cb) {
    Game.findByIdAndRemove(id, function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

Game.deleteGamesByTeam = function(team, cb) {
	Game.find({
        team: team
    }, function(err, docs) {
        if (err) {
            cb(err);
        } else {
            docs.forEach(function(doc) {
                doc.remove(cb);
            });
        }
    });
};

module.exports = Game;