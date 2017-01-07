const express = require('express'),
    config = require('../../config/subporter.config'),
    authenticate = require('../middleware/authenticate'),
    admin = require('../middleware/admin'),
    bodyValidator = require('../helpers/bodyValidator'),
    Country = require('../models/Countries');

let redis = config.redis_dev;

if (process.env.NODE_ENV === 'production') {
    redis = config.redis_prod;
}

const cache = require('express-redis-cache')({
    host: redis.host,
    port: redis.port,
    expire: 60
});

let router = express.Router();

/* Create */

router.post("/countries", authenticate, admin, (req, res) => {
    if (req.granted) {
        if (Object.keys(req.body).length !== 1 || bodyValidator(req.body.name)) {
            res.json({
                info: "Please supply all required fields",
                success: false
            });
        } else {
            Country.addCountry(req.body, (err) => {
                if (err) {
                    res.json({
                        info: "Error during creating country",
                        success: false,
                        error: err.errmsg
                    });
                } else {
                    res.json({
                        info: "Country created succesfully",
                        success: true
                    });
                    cache.del('/api/countries/*', (err, count) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("Cache for /api/countries cleared");
                        }
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
router.get("/countries", cache.route('/api/countries/all'), (req, res) => {
    Country.getCountries((err, countries) => {
        if (err) {
            res.json({
                info: "Error during reading countries",
                success: false,
                error: err.errmsg
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
});

/* Read (one country) */
router.get("/countries/:id", cache.route(), (req, res) => {
    Country.getCountryById(req.params.id, (err, country) => {
        if (err) {
            res.json({
                info: "Error during reading country",
                success: false,
                error: err.errmsg
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
});

/* Update */
router.put("/countries/:id", authenticate, admin, (req, res) => {
    if (req.granted) {
        if (Object.keys(req.body).length !== 1 || bodyValidator(req.body.name)) {
            res.json({
                info: "Please supply all required fields",
                success: false
            });
        } else {
            Country.getCountryById(req.params.id, (err, country) => {
                if (err) {
                    res.json({
                        info: "Error during reading country",
                        success: false,
                        error: err.errmsg
                    });
                } else if (country) {
                    Country.updateCountry(country, req.body, (err) => {
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
                            cache.del('/api/countries/*', (err, count) => {
                                if (err) {
                                    console.error(err);
                                } else {
                                    console.log("Cache for /api/countries cleared");
                                }
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
router.delete("/countries/:id", authenticate, admin, (req, res) => {
    if (req.granted) {
        Country.deleteCountry(req.params.id, (err) => {
            if (err) {
                res.json({
                    info: "Error during deleting country",
                    success: false,
                    error: err.errmsg
                });
            } else {
                res.json({
                    info: "Country deleted succesfully",
                    success: true
                });
                cache.del('/api/countries/*', (err, count) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("Cache for /api/countries cleared");
                    }
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