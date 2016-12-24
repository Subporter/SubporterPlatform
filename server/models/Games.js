const mongoose = require('mongoose'),
    gameSchema = require('../schemas/Games');

let Game = mongoose.model('Game', gameSchema, 'Games');

module.exports = Game;