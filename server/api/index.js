const sports = require("./sports");
const users = require("./users");
const countries = require("./countries");

let apiController = function (app) {
	app.use("/api", sports);
	app.use("/api", users);
    app.use("/api", countries);
};

module.exports.api = apiController;