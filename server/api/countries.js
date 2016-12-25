const express = require("express"),
	_ = require("lodash"),
	authenticate = require("../middleware/authenticate"),
	admin = require("../middleware/admin"),
	Country = require("../models/Countries");

let router = express.Router();

/* Create */
router.post("/countries", authenticate, admin, function (req, res) {
	if (req.granted) {
		let newCountry = new Country(req.body);
		newCountry.save(function (err) {
			if (err) {
				res.json({
					info: "Error during creating country",
					success: false,
					error: err
				});
			} else {
				res.json({
					info: "country created succesfully",
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

/* Read (all countries) */
router.get("/countries", authenticate, function (req, res) {
	Country.find(function (err, countries) {
		if (err) {
			res.json({
				info: "Error during reading countries",
				success: false,
				error: err
			});
		} else {
			res.json({
				info: "countries found succesfully",
				success: true,
				data: countries
			});
		}
	});
});

/* Read (one country) */
router.get("/countries/:id", function (req, res) {
	Country.findOne({
        id: req.params.id
    }, function (err, country) {
		if (err) {
			res.json({
				info: "Error during reading country",
				success: false,
				error: err
			});
		} else {
			res.json({
				info: "country found succesfully",
				success: true,
				data: country
			});
		}
	});
});

/* Read (one country) */



/* Update */
router.put("/countries/:id", authenticate, admin, function (req, res) {
	if (req.granted) {
		Country.findOne({
            id: req.params.id
        }, function (err, country) {
			if (err) {
				res.json({
					info: "Error during updating country",
					success: false,
					error: err
				});
			} else if (country) {
				_.merge(country, req.body);
				country.save(function (err) {
					if (err) {
						res.json({
							info: "Error during updating country",
							success: false,
							error: err
						});
					} else {
						res.json({
							info: "country updated succesfully",
							success: true
						});
					}
				});
			} else {
				res.json({
					info: "country not found",
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
router.delete("/countries/:id", authenticate, admin, function (req, res) {
	if (req.granted) {
		Country.findOneAndRemove({
            id: req.params.id
        }, function (err) {
			if (err) {
				res.json({
					info: "Error during deleting country",
					success: false,
					error: err
				});
			} else {
				res.json({
					info: "country deleted succesfully",
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