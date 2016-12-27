const User = require('../models/Users');

let loadUser = function(req, res, next) {
    if (req.granted) {
		User.getUserByEmail(req.jwtUser.email, function (err, user) {
			if (err) {
				throw err;
			} else {
				req.user = user;
			}
			next();
		});
    } else {
        next();
    }
};

module.exports = loadUser;