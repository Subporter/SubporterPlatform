const mongoose = require('mongoose'),
    config = require('../../config/subporter.config'),
    cachegoose = require('cachegoose'),
    _ = require('lodash'),
    loanSchema = require('../schemas/Loans');

let redis = config.redis_dev;

if (process.env.NODE_ENV === 'production') {
    redis = config.redis_prod;
}

cachegoose(mongoose, redis);

let Loan = mongoose.model('Loan', loanSchema, 'Loans');

let populateSchema = [{
    path: 'game',
    model: 'Game',
    populate: [{
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
    }]
}, {
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
}];

/* Create */
Loan.addLoan = function(body, cb) {
    let loan = new Loan(body);
    loan.save(function(err, docs) {
        if (err || !docs) {
            cb(err, null);
        } else {
            cb(null, docs._id);
        }
    });
};

/* Read (all subscriptions) */
Loan.getLoans = function(cb) {
    Loan.find({})
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

Loan.getLoansByGame = function(game, cb) {
    Loan.find({
            game: game,
            lent: false
        })
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

Loan.getAmountOfLoanedOutGames = function(game, cb) {
    Loan.count({
            game: game,
            lent: true
        })
        .exec(function(err, count) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, count);
            }
        })
        .cache();
};

Loan.getLoansByLentOutBy = function(user, cb) {
    Loan.find({
            lent_out_by: user
        })
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

Loan.getLoansByLentBy = function(user, cb) {
    Loan.find({
            lent_by: user
        })
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

/* Read (one subscription) */
Loan.getLoanById = function(id, cb) {
    Loan.findById(id)
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
Loan.updateLoan = function(loan, body, cb) {
    _.merge(loan, body);
    loan.save(function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

/* Delete */
Loan.deleteLoan = function(id, cb) {
    Loan.findById(id, function(err, docs) {
        if (err || !docs) {
            cb(err);
        } else {
            docs.remove(cb);
        }
    });
};

Loan.deleteLoansByGame = function(game, cb) {
    Loan.find({
        game: game
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

Loan.deleteLoansByUser = function(user, cb) {
    Loan.find({
        lent_out_by: user
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

module.exports = Loan;