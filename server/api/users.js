const express = require("express"),
	_ = require("lodash"),
	authenticate = require("../middleware/authenticate"),
	User = require("../models/Users");

let router = express.Router();

/* Read */
router.get("/user", authenticate, function (req, res) {
	if (req.granted) {
		User.findOne({
				email: req.jwtUser.email
			}, {
				admin: 0,
				password: 0
			}, function (err, user) {
				if (err) {
					throw err;
				} else if (!user) {
					res.status(403);
					res.json({
						info: "Error during reading user, user not found",
						success: false
					});
				} else {
					res.json({
						info: "User " + user.username + " found successfully",
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

/* Update */
router.put("/user", authenticate, function (req, res) {
	if (req.granted) {
		User.findOne({
				email: req.jwtUser.email
			}, function (err, user) {
				if (err) {
					res.json({
						info: "Error during updating user",
						success: false,
						error: err
					});
				} else if (user) {
					req.body.email = user.email;
					req.body.username = user.username;
					req.body.password = user.password;

					_.merge(user, req.body);
					user.admin = false;

					user.save(function (err) {
						if (err) {
							res.json({
								info: "Error during updating user",
								success: false,
								error: err
							});
						} else {
							res.json({
								info: "User updated successfully",
								success: true
							});
						}
					});
				} else {
					res.json({
						info: "User not found",
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

module.exports = router;