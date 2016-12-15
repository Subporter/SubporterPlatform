const express = require("express"),
	_ = require("lodash"),
	authenticate = require("../middleware/authenticate"),
	admin = require("../middleware/admin"),
	Price = require("../models/Prices");

let router = express.Router();

/* Create */
router.post("/prices", authenticate, admin, function (req, res) {
	if (req.granted) {
		let newPrice = new Price(req.body);
		newPrice.save(function (err) {
			if (err) {
				res.json({
					info: "Error during creating price",
					success: false,
					error: err
				});
			} else {
				res.json({
					info: "Price created succesfully",
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

/* Read (all prices) */
router.get("/prices", authenticate, function (req, res) {
	Price.find(function (err, prices) {
		if (err) {
			res.json({
				info: "Error during reading prices",
				success: false,
				error: err
			});
		} else {
			res.json({
				info: "Prices found succesfully",
				success: true,
				data: prices
			});
		}
	});
});

/* Read (one prices) */
router.get("/prices/:team_id", function (req, res) {
	Price.findOne({
        team_id: req.params.team_id
    }, function (err, price) {
		if (err) {
			res.json({
				info: "Error during reading price",
				success: false,
				error: err
			});
		} else {
			res.json({
				info: "Price found succesfully",
				success: true,
				data: price
			});
		}
	});
});

/* Update */
router.put("/prices/:team_id", authenticate, admin, function (req, res) {
	if (req.granted) {
		Price.findOne({
            team_id: req.params.team_id
        }, function (err, price) {
			if (err) {
				res.json({
					info: "Error during updating price",
					success: false,
					error: err
				});
			} else if (price) {
				_.merge(price, req.body);
				price.save(function (err) {
					if (err) {
						res.json({
							info: "Error during updating price",
							success: false,
							error: err
						});
					} else {
						res.json({
							info: "Price updated succesfully",
							success: true
						});
					}
				});
			} else {
				res.json({
					info: "Price not found",
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
router.delete("/prices/:team_id", authenticate, admin, function (req, res) {
	if (req.granted) {
		Price.findOneAndRemove({
            team_id: req.params.team_id
        }, function (err) {
			if (err) {
				res.json({
					info: "Error during deleting price",
					success: false,
					error: err
				});
			} else {
				res.json({
					info: "Price deleted succesfully",
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