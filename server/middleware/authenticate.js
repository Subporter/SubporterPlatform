const passport = require("passport"),
	jwt = require("jwt-simple"),
	config = require("../../config/subporter.config");

let authenticate = function (req, res, next) {
	if (passport.authenticate("jwt", { session: false })) {
		let token = getToken(req.headers);
		if (token) {
			req.granted = true;
			req.jwtUser = jwt.decode(token, config.jwt_secret);
		}
	}
	next();
};

let getToken = function (headers) {
	if (headers && headers.authorization) {
		let parted = headers.authorization.split(" ");
		if (parted.length === 2) {
			return parted[1];
		} else {
			return null;
		}
	} else {
		return null;
	}
};

module.exports = authenticate;