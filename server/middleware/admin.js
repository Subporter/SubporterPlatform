const User = require('../models/Users');

let admin = function(req, res, next) {
    if (req.granted) {
        User.getUserByEmailForAuth(req.jwtUser.email, function(err, user) {
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