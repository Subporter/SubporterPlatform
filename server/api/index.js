const sports = require("./sports");
const competitions = require("./competitions");
const users = require("./users");
const countries = require("./countries");

let apiController = function (app) {
	app.use("/api", sports);
	app.use("/api", users);
	app.use("/api", countries);
    app.use("/api", competitions);
};

module.exports.api = apiController;