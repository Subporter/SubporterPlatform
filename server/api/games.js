const express = require('express'),
    authenticate = require('../middleware/authenticate'),
    admin = require('../middleware/admin'),
    formParser = require('../middleware/formParser'),
    imageSaver = require('../middleware/imageSaver'),
    bodyValidator = require('../helpers/bodyValidator'),
    Game = require('../models/Games');

let router = express.Router();

/* Create */
router.post("/games", authenticate, admin, formParser, imageSaver, function(req, res) {
    if (req.granted) {
        if (Object.keys(req.body).length !== 6 || bodyValidator(req.body.away, req.body.banner, req.body.competition, req.body.date, req.body.home, req.body.importance)) {
            res.json({
                info: "Please supply all required fields",
                success: false
            });
        } else {
            Game.addGame(req.body, function(err) {
                if (err) {
                    res.json({
                        info: "Error during creating game",
                        success: false,
                        error: err
                    });
                } else {
                    res.json({
                        info: "Game created succesfully",
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
router.get("/games", function(req, res) {
    Game.getGames(function(err, games) {
        if (err) {
            res.json({
                info: "Error during reading games",
                success: false,
                error: err
            });
        } else if (games) {
            res.json({
                info: "Games found succesfully",
                success: true,
                data: games
            });
        } else {
            res.json({
                info: "Games not found",
                success: false
            });
        }
    });
});

router.get("/games/featured/:competition", function(req, res) {
    Game.getFeaturedGames(req.params.competition, function(err, games) {
        if (err) {
            res.json({
                info: "Error during reading games",
                success: false,
                error: err
            });
        } else if (games) {
            res.json({
                info: "Games found succesfully",
                success: true,
                data: games
            });
        } else {
            res.json({
                info: "Games not found",
                success: false
            });
        }
    });
});

router.get("/games/competition/:competition", function(req, res) {
    Game.getGamesByCompetition(req.params.competition, function(err, games) {
        if (err) {
            res.json({
                info: "Error during reading games",
                success: false,
                error: err
            });
        } else if (games) {
            res.json({
                info: "Games found succesfully",
                success: true,
                data: games
            });
        } else {
            res.json({
                info: "Games not found",
                success: false
            });
        }
    });
});

router.get("/games/team/:team", function(req, res) {
    Game.getGamesByTeam(req.params.team, function(err, games) {
        if (err) {
            res.json({
                info: "Error during reading games",
                success: false,
                error: err
            });
        } else if (games) {
            res.json({
                info: "Games found succesfully",
                success: true,
                data: games
            });
        } else {
            res.json({
                info: "Games not found",
                success: false
            });
        }
    });
});

/* Read (one game) */
router.get("/games/:id", function(req, res) {
    Game.getGameById(req.params.id, function(err, game) {
        if (err) {
            res.json({
                info: "Error during reading game",
                success: false,
                error: err
            });
        } else if (game) {
            res.json({
                info: "Game found succesfully",
                success: true,
                data: game
            });
        } else {
            res.json({
                info: "Game not found",
                success: false
            });
        }
    });
});

/* Update */
router.put("/games/:id", authenticate, admin, formParser, imageSaver, function(req, res) {
    if (req.granted) {
        if (Object.keys(req.body).length !== 6 || bodyValidator(req.body.away, req.body.banner, req.body.competition, req.body.date, req.body.home, req.body.importance)) {
            res.json({
                info: "Please supply all required fields",
                success: false
            });
        } else {
            Game.getGameById(req.params.id, function(err, game) {
                if (err) {
                    res.json({
                        info: "Error during reading game",
                        success: false,
                        error: err
                    });
                } else if (game) {
                    Game.updateGame(game, req.body, function(err) {
                        if (err) {
                            res.json({
                                info: "Error during updating game",
                                success: false,
                                error: err
                            });
                        } else {
                            res.json({
                                info: "Game updated succesfully",
                                success: true
                            });
                        }
                    });
                } else {
                    res.json({
                        info: "Game not found",
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
router.delete("/games/:id", authenticate, admin, function(req, res) {
    if (req.granted) {
        Game.deleteGame(req.params.id, function(err) {
            if (err) {
                res.json({
                    info: "Error during deleting game",
                    success: false,
                    error: err
                });
            } else {
                res.json({
                    info: "Game deleted succesfully",
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