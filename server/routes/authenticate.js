const express = require("express"),
	_ = require("lodash"),
	moment = require("moment"),
	jwt = require("jwt-simple"),
	config = require("../../config/subporter.config"),
	authenticate = require("../middleware/authenticate"),
	admin = require("../middleware/admin"),
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
				let expires = moment().add(7, "days").unix();
				let token = jwt.encode({
					email: user.email,
					exp: expires
				}, config.jwt_secret);
				res.json({
					info: "User created successfully",
					success: true,
					token: token,
					expires: moment().add(7, "days").format("dddd, MMMM Do YYYY, h:mm:ss a")
				});
			}
		});
	}
});

/* Check email */
router.get("/check/email", function (req, res) {
	if (!req.body.email) {
		res.json({
			info: "Please supply an email",
			success: false
		});
	} else {
		User.findOne({
			email: req.body.email
		}, function (err, user) {
			if (err) {
				throw err;
			}

			if (user) {
				res.json({
					info: "User with this email already exists",
					found: true
				});
			} else {
				res.json({
					info: "User with this email doesn't exist",
					found: false
				});
			}
		});
	}
});

/* Check username */
router.get("/check/username", function (req, res) {
	if (!req.body.username) {
		res.json({
			info: "Please supply a username",
			success: false
		});
	} else {
		User.findOne({
			username: req.body.username
		}, function (err, user) {
			if (err) {
				throw err;
			}

			if (user) {
				res.json({
					info: "User with this username already exists",
					found: true
				});
			} else {
				res.json({
					info: "User with this username doesn't exist",
					found: false
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
					let expires = moment().add(7, "days").unix();
					let token = jwt.encode({
						email: user.email,
						exp: expires
					}, config.jwt_secret);
					res.json({
						info: "Logged in successfully",
						success: true,
						token: token,
						expires: moment().add(7, "days").format("dddd, MMMM Do YYYY, h:mm:ss a")
					});
				}
			});
		}
	});
});

/* Check username */
router.get("/check/admin", authenticate, admin, function (req, res) {
	if (req.granted) {
		res.status(200);
		res.json({
			info: "Authorized",
			success: true
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