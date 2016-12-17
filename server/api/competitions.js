const express = require("express"),
	_ = require("lodash"),
	authenticate = require("../middleware/authenticate"),
	admin = require("../middleware/admin"),
	Competition = require("../models/Competitions");

let router = express.Router();

/* Create */
router.post("/competitions", authenticate, admin, function (req, res) {
	if (req.granted) {
		let newCompetition = new Competition(req.body);
		newCompetition.save(function (err) {
			if (err) {
				res.json({
					info: "Error during creating competition",
					success: false,
					error: err
				});
			} else {
				res.json({
					info: "Competition created succesfully",
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

/* Read (all competitions) */
router.get("/competitions", authenticate, function (req, res) {
	Competition.find(function (err, competitions) {
		if (err) {
			res.json({
				info: "Error during reading competitions",
				success: false,
				error: err
			});
		} else {
			res.json({
				info: "Competitions found succesfully",
				success: true,
				data: competitions
			});
		}
	});
});

/* Read (one competition) */
router.get("/competitions/:id", authenticate, function (req, res) {
	Competition.findById(req.params.id, function (err, competition) {
		if (err) {
			res.json({
				info: "Error during reading competition",
				success: false,
				error: err
			});
		} else {
			res.json({
				info: "Competition found succesfully",
				success: true,
				data: competition
			});
		}
	});
});

/* Update */
router.put("/competitions/:id", authenticate, admin, function (req, res) {
	if (req.granted) {
		Competition.findById(req.params.id, function (err, competition) {
			if (err) {
				res.json({
					info: "Error during updating competition",
					success: false,
					error: err
				});
			} else if (competition) {
				_.merge(competition, req.body);
				competition.save(function (err) {
					if (err) {
						res.json({
							info: "Error during updating competition",
							success: false,
							error: err
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
	} else {
		res.status(403);
		res.json({
			info: "Unauthorized",
			success: false
		});
	}
});

/* Delete */
router.delete("/competitions/:id", authenticate, admin, function (req, res) {
	if (req.granted) {
		Competition.findByIdAndRemove(req.params.id, function (err) {
			if (err) {
				res.json({
					info: "Error during deleting competition",
					success: false,
					error: err
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