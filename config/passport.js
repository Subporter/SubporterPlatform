const JwtStrategy = require("passport-jwt").Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt,
	config = require("./subporter.config"),
	mongoose = require("mongoose"),
	User = mongoose.model("User");

let passportConfig = function (passport) {
	let options = {};
	options.jwtFromRequest = ExtractJwt.fromAuthHeader();
	options.secretOrKey = config.jwt_secret;

	passport.use(new JwtStrategy(options, function (jwt_payload, done) {
		User.findOne({
			id: jwt_payload.id
		}, function (err, user) {
			if (err) {
				return done(err, false);
			} else if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		});
	}));
};

module.exports = passportConfig;