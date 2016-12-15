const express = require("express"),
	_ = require("lodash"),
	authenticate = require("../middleware/authenticate"),
	admin = require("../middleware/admin"),
	Sport = require("../models/Sports");

let router = express.Router();

/* Create */
router.post("/sports", authenticate, admin, function (req, res) {
	if (req.granted) {
		let newSport = new Sport(req.body);
		newSport.save(function (err) {
			if (err) {
				res.json({
					info: "Error during creating sport",
					success: false,
					error: err
				});
			} else {
				res.json({
					info: "Sport created succesfully",
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

/* Read (all sports) */
router.get("/sports", authenticate, function (req, res) {
	Sport.find(function (err, sports) {
		if (err) {
			res.json({
				info: "Error during reading sports",
				success: false,
				error: err
			});
		} else {
			res.json({
				info: "Sports found succesfully",
				success: true,
				data: sports
			});
		}
	});
});

/* Read (one sport) */
router.get("/sports/:id", authenticate, function (req, res) {
	Sport.findById(req.params.id, function (err, sport) {
		if (err) {
			res.json({
				info: "Error during reading sport",
				success: false,
				error: err
			});
		} else {
			res.json({
				info: "Sport found succesfully",
				success: true,
				data: sport
			});
		}
	});
});

/* Update */
router.put("/sports/:id", authenticate, admin, function (req, res) {
	if (req.granted) {
		Sport.findById(req.params.id, function (err, sport) {
			if (err) {
				res.json({
					info: "Error during updating sport",
					success: false,
					error: err
				});
			} else if (sport) {
				_.merge(sport, req.body);
				sport.save(function (err) {
					if (err) {
						res.json({
							info: "Error during updating sport",
							success: false,
							error: err
						});
					} else {
						res.json({
							info: "Sport updated succesfully",
							success: true
						});
					}
				});
			} else {
				res.json({
					info: "Sport not found",
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
router.delete("/sports/:id", authenticate, admin, function (req, res) {
	if (req.granted) {
		Sport.findByIdAndRemove(req.params.id, function (err) {
			if (err) {
				res.json({
					info: "Error during deleting sport",
					success: false,
					error: err
				});
			} else {
				res.json({
					info: "Sport deleted succesfully",
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