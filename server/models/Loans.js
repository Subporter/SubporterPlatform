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
        } else {
            cb(null);
        }
    });
};

/* Read (all subscriptions) */
Loan.getLoans = function(body, cb) {
    Loan.find({}).populate('lent_by subscription game').exec(function(err, docs) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, docs);
        }
    });
};

/* Read (one subscription) */
Loan.getLoanById = function(id, cb) {
    Loan.findById(id).populate('lent_by subscription game').exec(function(err, docs) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, docs);
        }
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
        } else {
            cb(null);
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