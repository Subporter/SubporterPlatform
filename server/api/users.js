const express = require("express"),
	_ = require("lodash"),
	passport = require("passport"),
	auth = require("../helpers/authHelper"),
	jwt = require("jwt-simple"),
	config = require("../../config/subporter.config"),
	User = require("../models/Users");

let router = express.Router();

/* Read */
router.get("/user", function (req, res) {
	let token;

	if (passport.authenticate("jwt", {
			session: false
		})) {
		token = auth.getToken(req.headers);
	}

	if (token) {
		let jwtUser = jwt.decode(token, config.jwt_secret);
		User.findOne({
				email: jwtUser.user
			}, {
				admin: 0,
				password: 0
			},
			function (err, user) {
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
			info: "Error during reading user, no token provided",
			success: false
		});
	}
});

/* Update */
router.put("/user", function (req, res) {
	let token;

	if (passport.authenticate("jwt", { session: false })) {
		token = auth.getToken(req.headers);
	}

	if (token) {
		let jwtUser = jwt.decode(token, config.jwt_secret);
		User.findOne({
				email: jwtUser.user
			},
			function (err, user) {
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
							})
						}
					})
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
			info: "Error during updating user, no token provided",
			success: false
		});
	}
});

module.exports = router;