const express = require('express'),
    authenticate = require('../middleware/authenticate'),
    admin = require('../middleware/admin'),
    formParser = require('../middleware/formParser'),
    imageSaver = require('../middleware/imageSaver'),
    bodyValidator = require('../helpers/bodyValidator'),
    Competition = require('../models/Competitions');

let router = express.Router();

/* Create */
router.post("/competitions", authenticate, admin, formParser, imageSaver, function(req, res) {
    if (req.granted) {
        if (Object.keys(req.body).length !== 5 || bodyValidator(req.body.country, req.body.description, req.body.logo, req.body.name, req.body.sport)) {
            res.json({
                info: "Please supply all required fields",
                success: false
            });
        } else {
            Competition.addCompetition(req.body, function(err) {
                if (err) {
                    res.json({
                        info: "Error during creating competition",
                        success: false,
                        error: err.errmsg
                    });
                } else {
                    res.json({
                        info: "Competition created succesfully",
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

/* Read (all competitions) */
router.get("/competitions", authenticate, function(req, res) {
    if (req.granted) {
        Competition.getCompetitions(function(err, competitions) {
            if (err) {
                res.json({
                    info: "Error during reading competitions",
                    success: false,
                    error: err.errmsg
                });
            } else if (competitions) {
                res.json({
                    info: "Competitions found succesfully",
                    success: true,
                    data: competitions
                });
            } else {
                res.json({
                    info: "Competitions not found",
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

router.get("/competitions/country/:country", authenticate, function(req, res) {
    if (req.granted) {
        Competition.getCompetitionsByCountry(req.params.country, function(err, competitions) {
            if (err) {
                res.json({
                    info: "Error during reading competitions",
                    success: false,
                    error: err.errmsg
                });
            } else if (competitions) {
                res.json({
                    info: "Competitions found succesfully",
                    success: true,
                    data: competitions
                });
            } else {
                res.json({
                    info: "Competitions not found",
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

router.get("/competitions/sport/:sport", authenticate, function(req, res) {
    if (req.granted) {
        Competition.getCompetitionsBySport(req.params.sport, function(err, competitions) {
            if (err) {
                res.json({
                    info: "Error during reading competitions",
                    success: false,
                    error: err.errmsg
                });
            } else if (competitions) {
                res.json({
                    info: "Competitions found succesfully",
                    success: true,
                    data: competitions
                });
            } else {
                res.json({
                    info: "Competitions not found",
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

router.get("/competitions/country/:country/sport/:sport", authenticate, function(req, res) {
    if (req.granted) {
        Competition.getCompetitionsByCountryAndSport(req.params.country, req.params.sport, function(err, competitions) {
            if (err) {
                res.json({
                    info: "Error during reading competitions",
                    success: false,
                    error: err.errmsg
                });
            } else if (competitions) {
                res.json({
                    info: "Competitions found succesfully",
                    success: true,
                    data: competitions
                });
            } else {
                res.json({
                    info: "Competitions not found",
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

/* Read (one competition) */
router.get("/competitions/:id", authenticate, function(req, res) {
    if (req.granted) {
        Competition.getCompetitionById(req.params.id, function(err, competition) {
            if (err) {
                res.json({
                    info: "Error during reading competition",
                    success: false,
                    error: err.errmsg
                });
            } else if (competition) {
                res.json({
                    info: "Competition found succesfully",
                    success: true,
                    data: competition
                });
            } else {
                res.json({
                    info: "Competition not found",
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
router.put("/competitions/:id", authenticate, admin, formParser, imageSaver, function(req, res) {
    if (req.granted) {
        if (Object.keys(req.body).length !== 5 || bodyValidator(req.body.country, req.body.description, req.body.logo, req.body.name, req.body.sport)) {
            res.json({
                info: "Please supply all required fields",
                success: false
            });
        } else {
            Competition.getCompetitionById(req.params.id, function(err, competition) {
                if (err) {
                    res.json({
                        info: "Error during reading competition",
                        success: false,
                        error: err.errmsg
                    });
                } else if (competition) {
                    Competition.updateCompetition(competition, req.body, function(err) {
                        if (err) {
                            res.json({
                                info: "Error during updating competition",
                                success: false,
                                error: err.errmsg
                            });
                        } else {
                            res.json({
                                info: "Competition updated succesfully",
                                success: true
                            });
                        }
                    });
                } else {
                    res.json({
                        info: "Competition not found",
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
router.delete("/competitions/:id", authenticate, admin, function(req, res) {
    if (req.granted) {
        Competition.deleteCompetition(req.params.id, function(err) {
            if (err) {
                res.json({
                    info: "Error during deleting competition",
                    success: false,
                    error: err.errmsg
                });
            } else {
                res.json({
                    info: "Competition deleted succesfully",
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