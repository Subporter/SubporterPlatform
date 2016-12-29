const express = require('express'),
    authenticate = require('../middleware/authenticate'),
    admin = require('../middleware/admin'),
    bodyValidator = require('../helpers/bodyValidator'),
    Country = require('../models/Countries');

let router = express.Router();

/* Create */
router.post("/countries", authenticate, admin, function(req, res) {
    if (req.granted) {
        if (Object.keys(req.body).length !== 1 || bodyValidator(req.body.name)) {
            res.json({
                info: "Please supply all required fields",
                success: false
            });
        } else {
            Country.addCountry(req.body, function(err) {
                if (err) {
                    res.json({
                        info: "Error during creating country",
                        success: false,
                        error: err
                    });
                } else {
                    res.json({
                        info: "Country created succesfully",
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

/* Read (all countries) */
router.get("/countries", authenticate, function(req, res) {
    if (req.granted) {
        Country.getCountries(function(err, countries) {
            if (err) {
                res.json({
                    info: "Error during reading countries",
                    success: false,
                    error: err
                });
            } else if (countries) {
                res.json({
                    info: "Countries found succesfully",
                    success: true,
                    data: countries
                });
            } else {
                res.json({
                    info: "Countries not found",
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

/* Read (one country) */
router.get("/countries/:id", authenticate, function(req, res) {
    if (req.granted) {
        Country.getCountryById(req.params.id, function(err, country) {
            if (err) {
                res.json({
                    info: "Error during reading country",
                    success: false,
                    error: err
                });
            } else if (country) {
                res.json({
                    info: "Country found succesfully",
                    success: true,
                    data: country
                });
            } else {
                res.json({
                    info: "Country not found",
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
router.put("/countries/:id", authenticate, admin, function(req, res) {
    if (req.granted) {
        if (Object.keys(req.body).length !== 1 || bodyValidator(req.body.name)) {
            res.json({
                info: "Please supply all required fields",
                success: false
            });
        } else {
            Country.getCountryById(req.params.id, function (err, country) {
                if (err) {
                    res.json({
                        info: "Error during reading country",
                        success: false,
                        error: err
                    });
                } else if (country) {
                    Country.updateCountry(country, req.body, function (err) {
                        if (err) {
                            res.json({
                                info: "Error during updating country",
                                success: false,
                                error: err
                            });
                        } else {
                            res.json({
                                info: "Country updated succesfully",
                                success: true
                            });
                        }
                    });
                } else {
                    res.json({
                        info: "Country not found",
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
router.delete("/countries/:id", authenticate, admin, function(req, res) {
    if (req.granted) {
        Country.deleteCountry(req.params.id, function(err) {
            if (err) {
                res.json({
                    info: "Error during deleting country",
                    success: false,
                    error: err
                });
            } else {
                res.json({
                    info: "Country deleted succesfully",
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