const User = require('../models/Users');

let loadUser = (req, res, next) => {
    if (req.granted) {
		User.getUserByEmail(req.jwtUser.email, (err, user) => {
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