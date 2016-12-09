const express = require("express"),
	_ = require("lodash"),
	Sport = require("../models/Sports");

let router = express.Router();

/* Create */
router.post("/sports", function (req, res) {
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
});

/* Read (all sports) */
router.get("/sports", function (req, res) {
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
router.get("/sports/:id", function (req, res) {
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
router.put("/sports/:id", function (req, res) {
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
});

/* Delete */
router.delete("/sports/:id", function (req, res) {
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
});

module.exports = router;