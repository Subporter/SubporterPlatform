const express = require('express'),
    authenticate = require('../middleware/authenticate'),
    admin = require('../middleware/admin'),
    formParser = require('../middleware/formParser'),
    imageSaver = require('../middleware/imageSaver'),
    loadUser = require('../middleware/loadUser'),
    bodyValidator = require('../helpers/bodyValidator'),
    Team = require('../models/Teams'),
	Address = require('../models/Addresses'),
    User = require('../models/Users');

let router = express.Router();

/* Create */
router.post("/teams", authenticate, admin, formParser, imageSaver, function(req, res) {
    if (req.granted) {
        if (Object.keys(req.body).length !== 11 || bodyValidator(req.body.name, req.body.stadion, req.body.price, req.body.logo, req.body.address, req.body.street, req.body.number, req.body.postal, req.body.city, req.body.country, req.body.competition)) {
            res.json({
                info: "Please supply all required fields",
                success: false
            });
        } else {
            Address.addOrUpdateAddress(req.body.address, req.body, function(err, id) {
                if (err || !id) {
                    res.json({
                        info: "Error during creating/updating address",
                        success: false,
                        error: err.errmsg
                    });
                } else {
                    req.body.address = id;
                    Team.addTeam(req.body, function(err) {
                        if (err) {
                            res.json({
                                info: "Error during creating team",
                                success: false,
                                error: err.errmsg
                            });
                        } else {
                            res.json({
                                info: "Team created succesfully",
                                success: true
                            });
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

/* Read (all teams) */
router.get("/teams", authenticate, function(req, res) {
    if (req.granted) {
        Team.getTeams(function(err, teams) {
            if (err) {
                res.json({
                    info: "Error during reading teams",
                    success: false,
                    error: err.errmsg
                });
            } else if (teams) {
                res.json({
                    info: "Teams found succesfully",
                    success: true,
                    data: teams
                });
            } else {
                res.json({
                    info: "Teams not found",
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

router.get("/teams/competition/:competition",authenticate, function(req, res) {
    if (req.granted) {
        Team.getTeamsByCompetition(req.params.competition, function(err, teams) {
            if (err) {
                res.json({
                    info: "Error during reading teams",
                    success: false,
                    error: err.errmsg
                });
            } else if (teams) {
                res.json({
                    info: "Teams found succesfully",
                    success: true,
                    data: teams
                });
            } else {
                res.json({
                    info: "Teams not found",
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

/* Read (one team) */
router.get("/teams/:id", authenticate, function(req, res) {
    if (req.granted) {
        Team.getTeamById(req.params.id, function(err, team) {
            if (err) {
                res.json({
                    info: "Error during reading team",
                    success: false,
                    error: err.errmsg
                });
            } else if (team) {
                res.json({
                    info: "Team found succesfully",
                    success: true,
                    data: team
                });
            } else {
                res.json({
                    info: "Team not found",
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

/* Read (teams by competition) */
router.get("/teams/comp/:competition", authenticate, function (req, res) {
	Team.find({"competition":req.params.competition}, function (err, team) {
		if (err) {
			res.json({
				info: "Error during reading team",
				success: false,
				error: err
			});
		} else {
			res.json({
				info: "Teams found succesfully",
				success: true,
				data: team
			});
		}
	});
});


/* Update */
router.put("/teams/:id", authenticate, admin, formParser, imageSaver, function(req, res) {
    if (req.granted) {
        if (Object.keys(req.body).length !== 11 || bodyValidator(req.body.name, req.body.stadion, req.body.price, req.body.logo, req.body.address, req.body.street, req.body.number, req.body.postal, req.body.city, req.body.country, req.body.competition)) {
            res.json({
                info: "Please supply all required fields",
                success: false
            });
        } else {
            Team.getTeamById(req.params.id, function(err, team) {
                if (err) {
                    res.json({
                        info: "Error during reading team",
                        success: false,
                        error: err.errmsg
                    });
                } else if (team) {
                    Address.addOrUpdateAddress(req.body.address, req.body, function(err, id) {
                        if (err || !id) {
                            res.json({
                                info: "Error during creating/updating address",
                                success: false,
                                error: err.errmsg
                            });
                        } else {
                            req.body.address = id;
                            Team.updateTeam(team, req.body, function(err) {
                                if (err) {
                                    res.json({
                                        info: "Error during updating team",
                                        success: false,
                                        error: err.errmsg
                                    });
                                } else {
                                    res.json({
                                        info: "Team updated succesfully",
                                        success: true
                                    });
                                }
                            });
                        }
                    });
                } else {
                    res.json({
                        info: "Team not found",
                        success: false
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

/* Favorite */
router.get("/teams/favorite/:id", authenticate, loadUser, function (req, res) {
    if (req.granted) {
        User.toggleFavorite(req.user, req.params.id, function (err, user) {
            if (err) {
                res.json({
                    info: "Error during favoriting team",
                    success: false,
                    error: err.errmsg
                });
            } else {
                res.json({
                    info: "Team favorited succesfully",
                    success: true,
                    data: user
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

/* Delete */
router.delete("/teams/:id", authenticate, admin, function(req, res) {
    if (req.granted) {
        Team.deleteTeam(req.params.id, function(err) {
            if (err) {
                res.json({
                    info: "Error during deleting team",
                    success: false,
                    error: err.errmsg
                });
            } else {
                res.json({
                    info: "Team deleted succesfully",
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