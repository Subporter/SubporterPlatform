const mongoose = require('mongoose'),
	loanSchema = require('../schemas/Loans');

let Loan = mongoose.model('Loan', loanSchema, 'Loans');

module.exports = Loan;