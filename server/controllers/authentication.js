const passport = require('passport'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

let authenticationController = (function () {
	let sendJSONresponse = function (res, status, content) {
		res.status(status);
		res.json(content);
	};

	let register = function (req, res) {
		let user = new User();

		user.email = req.body.email;
		user.username = req.body.username;

		user.setPassword(req.body.password);

		user.save(function (err) {
			let token;
			token = user.generateJwt();
			res.status(200);
			res.json({
				"token": token
			});
		});
	};

	let login = function (req, res) {
		passport.authenticate('local', function (err, user, info) {
			let token;

			if (err) {
				res.status(404);
				res.json(err);
				return;
			}

			if (user) {
				token = user.generateJWT();
				res.status(200);
				res.json({
					"token": token
				});
			} else {
				res.status(401);
				res.json(info);
			}
		})(req, res);
	};

	return {
		register: register,
		login: login,
	};

})();

module.exports = authenticationController;