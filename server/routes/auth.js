const express = require("express"),
	_ = require("lodash"),
	jwt = require("jwt-simple"),
	config = require("../../config/subporter.config"),
	User = require("../models/Users");

let router = express.Router();

/* Register */
router.post("/register", function (req, res) {
	if (!req.body.email || !req.body.username || !req.body.password) {
		res.json({
			info: "Please supply all required fields",
			success: false
		});
	} else {
		let user = new User(req.body);
		user.save(function (err) {
			if (err) {
				res.json({
					info: "Error during creating user, e-mail or username may be in use already",
					success: false,
					error: err
				});
			} else {
				res.json({
					info: "User created successfully",
					success: true
				});
			}
		});
	}
});

/* Login */
router.post("/login", function (req, res) {
	User.findOne({
		email: req.body.email
	}, function (err, user) {
		if (err) {
			throw err;
		} else if (!user) {
			res.json({
				info: "Error during login, user not found",
				success: false
			});
		} else {
			user.comparePassword(req.body.password, function (err, isMatch) {
				if (err || !isMatch) {
					res.json({
						info: "Error during login, wrong password",
						success: false
					});
				} else {
					let token = jwt.encode(user, config.jwt_secret);
					res.json({
						info: "Logged in successfully",
						success: true,
						token: token
					});
				}
			});
		}
	});
});

module.exports = router;