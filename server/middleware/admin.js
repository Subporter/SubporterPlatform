const User = require("../models/Users");

let admin = function (req, res, next) {
	if (req.granted) {
		User.findOne({
			email: req.jwtUser.email
		}, {
			password: 0
		}, function (err, user) {
			if (err) {
				throw err;
			} else {
				if (user.admin === true) {
					req.granted = true;
				} else {
					req.granted = false;
				}
			}
			next();
		});
	} else {
		next();
	}
};

module.exports = admin;