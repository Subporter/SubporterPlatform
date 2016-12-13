const authenticate  = require("./authenticate");

let routesController = function (app) {
	app.use("/", authenticate);
};

module.exports.routes = routesController;