const express = require('express'),
    authenticate = require('../middleware/authenticate'),
    admin = require('../middleware/admin'),
    loadUser = require('../middleware/loadUser'),
    bodyValidator = require('../helpers/bodyValidator'),
    Loan = require('../models/Loans');

let router = express.Router();

/* Create */
router.post("/loans", authenticate, loadUser, function(req, res) {
    if (req.granted) {
        if (Object.keys(req.body).length !== 2 || bodyValidator(req.body.subscription, req.body.game)) {
            res.json({
                info: "Please supply all required fields",
                success: false
            });
        } else {
            Loan.addLoan(req.body, function(err) {
                if (err) {
                    res.json({
                        info: "Error during creating loan",
                        success: false,
                        error: err
                    });
                } else {
                    res.json({
                        info: "Loan created succesfully",
                        success: true
                    });
                }
            });
        }
    } else {
        res.status(403);
        res.json({
            info: "Unauthorized",
            success: false
        });
    }
});

/* Read (all games) */
router.get("/loans", authenticate, function(req, res) {
    if (req.granted) {
        Loan.getLoans(function(err, loans) {
            if (err) {
                res.json({
                    info: "Error during reading loans",
                    success: false,
                    error: err
                });
            } else if (loans) {
                res.json({
                    info: "Loans found succesfully",
                    success: true,
                    data: loans
                });
            } else {
                res.json({
                    info: "Loans not found",
                    success: false
                });
            }
        });
    } else {
        res.status(403);
        res.json({
            info: "Unauthorized",
            success: false
        });
    }
});

/* Read (one game) */
router.get("/loans/:id", authenticate, function(req, res) {
    if (req.granted) {
        Loan.getLoanById(req.params.id, function(err, loan) {
            if (err) {
                res.json({
                    info: "Error during reading loan",
                    success: false,
                    error: err
                });
            } else if (loan) {
                res.json({
                    info: "Loan found succesfully",
                    success: true,
                    data: loan
                });
            } else {
                res.json({
                    info: "Loan not found",
                    success: false
                });
            }
        });
    } else {
        res.status(403);
        res.json({
            info: "Unauthorized",
            success: false
        });
    }
});

/* Update */
router.put("/loans/:id", authenticate, admin, function(req, res) {
    if (req.granted) {
        if (1 === 2) {
            res.json({
                info: "Please supply all required fields",
                success: false
            });
        } else {
            Loan.getLoanById(req.params.id, function(err, loan) {
                if (err) {
                    res.json({
                        info: "Error during reading loan",
                        success: false,
                        error: err
                    });
                } else if (loan) {
                    Loan.updateLoan(loan, req.body, function(err) {
                        if (err) {
                            res.json({
                                info: "Error during updating loan",
                                success: false,
                                error: err
                            });
                        } else {
                            res.json({
                                info: "Loan updated succesfully",
                                success: true
                            });
                        }
                    });
                } else {
                    res.json({
                        info: "Loan not found",
                        success: false,
                    });
                }
            });
        }
    } else {
        res.status(403);
        res.json({
            info: "Unauthorized",
            success: false
        });
    }
});

/* Delete */
router.delete("/loans/:id", authenticate, admin, function(req, res) {
    if (req.granted) {
        Loan.deleteLoan(req.params.id, function(err) {
            if (err) {
                res.json({
                    info: "Error during deleting loan",
                    success: false,
                    error: err
                });
            } else {
                res.json({
                    info: "Loan deleted succesfully",
                    success: true
                });
            }
        });
    } else {
        res.status(403);
        res.json({
            info: "Unauthorized",
            success: false
        });
    }
});

module.exports = router;