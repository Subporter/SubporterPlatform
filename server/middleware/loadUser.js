const User = require('../models/Users');

let loadUser = function(req, res, next) {
    if (req.granted) {
		User.getUserByEmailForAuth(req.jwtUser.email, function (err, user) {
			if (err) {
				req.granted = false;
			} else {
				req.user = user;
				req.granted = true;
			}
			next();
		});
    } else {
        next();
    }
};

module.exports = loadUser;