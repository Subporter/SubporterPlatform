const express = require("express"),
	_ = require("lodash"),
	authenticate = require("../middleware/authenticate"),
	admin = require("../middleware/admin"),
	Team = require("../models/Teams");

let router = express.Router();

/* Create */
router.post("/teams", authenticate, admin, function (req, res) {
	if (req.granted) {
		let newTeam = new Team(req.body);
		newTeam.save(function (err) {
			if (err) {
				res.json({
					info: "Error during creating team",
					success: false,
					error: err
				});
			} else {
				res.json({
					info: "Team created succesfully",
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

/* Read (all teams) */
router.get("/teams", authenticate, function (req, res) {
	Team.find(function (err, teams) {
		if (err) {
			res.json({
				info: "Error during reading teams",
				success: false,
				error: err
			});
		} else {
			res.json({
				info: "Teams found succesfully",
				success: true,
				data: teams
			});
		}
	});
});

/* Read (one team) */
router.get("/teams/:id", authenticate, function (req, res) {
	Team.findById(req.params.id, function (err, team) {
		if (err) {
			res.json({
				info: "Error during reading team",
				success: false,
				error: err
			});
		} else {
			res.json({
				info: "Team found succesfully",
				success: true,
				data: team
			});
		}
	});
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
router.put("/teams/:id", authenticate, admin, function (req, res) {
	if (req.granted) {
		Team.findById(req.params.id, function (err, team) {
			if (err) {
				res.json({
					info: "Error during updating team",
					success: false,
					error: err
				});
			} else if (team) {
				_.merge(team, req.body);
				team.save(function (err) {
					if (err) {
						res.json({
							info: "Error during updating team",
							success: false,
							error: err
						});
					} else {
						res.json({
							info: "Team updated succesfully",
							success: true
						});
					}
				});
			} else {
				res.json({
					info: "Team not found",
					success: false,
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
router.delete("/teams/:id", authenticate, admin, function (req, res) {
	if (req.granted) {
		Team.findByIdAndRemove(req.params.id, function (err) {
			if (err) {
				res.json({
					info: "Error during deleting team",
					success: false,
					error: err
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