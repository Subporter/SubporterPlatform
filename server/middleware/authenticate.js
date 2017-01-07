const passport = require('passport'),
    config = require('../../config/subporter.config'),
    jwt = require('jwt-simple');

let authenticate = (req, res, next) => {
    if (passport.authenticate('jwt', { session: false })) {
		try {
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
		} catch (err) {
			req.granted = false;
		}
    } else {
		req.granted = false;
	}
    next();
};

let getToken = (headers) => {
    if (headers && headers.authorization) {
        return headers.authorization;
    } else {
        return null;
    }
};

module.exports = authenticate;