const auth = require("./auth");

let routesController = function (app) {
	app.use("/", auth);
};

module.exports.routes = routesController;