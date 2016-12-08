const express = require("express"),
	_ = require("lodash"),
	passport = require("passport"),
	auth = require("../helpers/authHelper"),
	jwt = require("jwt-simple"),
	config = require("../../config/subporter.config"),
	User = require("../models/Users");

let router = express.Router();

/* Read */
router.get("/user", passport.authenticate("jwt", { session: false }), function (req, res) {
	let token = auth.getToken(req.headers);
	if (token) {
		let jwtUser = jwt.decode(token, config.jwt_secret);
		User.findOne({
			email: jwtUser.email
		}, {
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

module.exports = router;