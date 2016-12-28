const mongoose = require('mongoose'),
    _ = require('lodash'),
	loanSchema = require('../schemas/Loans');

let Loan = mongoose.model('Loan', loanSchema, 'Loans');

/* Create */
Loan.addLoan = function(body, cb) {
    let loan = new Loan(body);
    loan.save(function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

/* Read (all subscriptions) */
Loan.getLoans = function(body, cb) {
    Loan.find({}).populate('lent_by subscription game').exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

/* Read (one subscription) */
Loan.getLoanById = function(id, cb) {
    Loan.findById(id).populate('lent_by subscription game').exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
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
    Loan.findByIdAndRemove(id, function(err) {
        if (err) {
            cb(err);
        }
        cb(null);
    });
};

module.exports = Loan;