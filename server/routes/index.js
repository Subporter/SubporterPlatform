const authenticate = require("./authenticate");

let routesController = function (app) {
	app.use("/", authenticate);

	app.get('*', function (req, res) {
		let index = path.resolve(__dirname, "../../public/index.html");
		res.sendFile(index);
	});
};

module.exports.routes = routesController;