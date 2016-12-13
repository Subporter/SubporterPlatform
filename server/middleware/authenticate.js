const passport = require("passport"),
	jwt = require("jwt-simple"),
	config = require("../../config/subporter.config");

let authenticate = function (req, res, next) {
	if (passport.authenticate("jwt", { session: false })) {
		let token = getToken(req.headers);
		if (token) {
			let user = jwt.decode(token, config.jwt_secret);
			if (user) {
				req.jwtUser = user;
				req.granted = true;
			} else {
				req.granted = false;
			}
		} else {
			req.granted = false;
		}
	}
	next();
};

let getToken = function (headers) {
	if (headers && headers.authorization) {
		return headers.authorization;
	} else {
		return null;
	}
};

module.exports = authenticate;