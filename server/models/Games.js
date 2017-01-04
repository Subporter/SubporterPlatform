const mongoose = require('mongoose'),
    moment = require('moment'),
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
}, {
    path: 'loans',
    model: 'Loan',
    populate: [{
        path: 'lent_by',
        model: 'User',
        populate: [{
            path: 'address',
            model: 'Address',
            populate: [{
                path: 'country',
                model: 'Country'
            }]
        }, {
            path: 'favorites',
            model: 'Team',
            populate: [{
                path: 'competition',
                model: 'Competition',
                populate: [{
                    path: 'country',
                    model: 'Country'
                }, {
                    path: 'sport',
                    model: 'Sport'
                }]
            }, {
                path: 'address',
                model: 'Address',
                populate: [{
                    path: 'country',
                    model: 'Country'
                }]
            }]
        }, {
            path: 'subscriptions',
            model: 'Subscription',
            populate: [{
                path: 'team',
                model: 'Team',
                populate: [{
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
                }]
            }]
        }]
    }, {
        path: 'lent_out_by',
        model: 'User',
        populate: [{
            path: 'address',
            model: 'Address',
            populate: [{
                path: 'country',
                model: 'Country'
            }]
        }, {
            path: 'favorites',
            model: 'Team',
            populate: [{
                path: 'competition',
                model: 'Competition',
                populate: [{
                    path: 'country',
                    model: 'Country'
                }, {
                    path: 'sport',
                    model: 'Sport'
                }]
            }, {
                path: 'address',
                model: 'Address',
                populate: [{
                    path: 'country',
                    model: 'Country'
                }]
            }]
        }, {
            path: 'subscriptions',
            model: 'Subscription',
            populate: [{
                path: 'team',
                model: 'Team',
                populate: [{
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
                }]
            }]
        }]
    }, {
        path: 'subscription',
        model: 'Subscription',
        populate: [{
            path: 'team',
            model: 'Team',
            populate: [{
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
            }]
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
    Game.find({
            date: {
                $gt: moment().toDate()
            }
        })
        .populate(populateSchema)
        .sort({
            date: 1,
            importance: -1,
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

Game.getFeaturedGames = function(country, cb) {
    
    Game.find({
            date: {
                $gt: moment().toDate()
            }
        })
        .populateSchema(populateSchema)
        .sort({
            importance: -1,
            date: 1,
            home: 1,
            away: 1
        })
        .limit(6)
        .exec(function(err, docs) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, docs);
            }
        });
};

Game.getGamesByTeam = function(team, cb) {
    Game.find({
            home: team,
            date: {
                $gt: moment().toDate()
            }
        })
        .populate(populateSchema)
        .sort({
            date: 1
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

/* Loans */
Game.toggleLoans = function(game, loan, cb) {
    game.loans.toggleAndSort(loan);
    game.save(function(err, docs) {
        if (err) {
            cb(err);
        } else {
            cb(null);
        }
    });
};

/* Helper */
Array.prototype.toggleAndSort = function(value) {
    let i = this.findIndex(item => item._id === value);

    if (i === -1) {
        this.push(value);
    } else {
        this.splice(i, 1);
    }

    this.sort(function(a, b) {
        return a - b;
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
        if (err || !docs) {
            cb(err);
        } else {
            docs.remove(cb);
        }
    });
};

Game.deleteGamesByTeam = function(team, cb) {
    Game.find({
            home: team
        })
        .exec(function(err, docs) {
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