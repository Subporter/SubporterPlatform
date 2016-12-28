const users = require("./users");
const sports = require("./sports");
const countries = require("./countries");
const competitions = require("./competitions");
const teams = require("./teams");
const addresses = require("./addresses");

let apiController = function (app) {
	app.use("/api", users);
	app.use("/api", sports);
	app.use("/api", countries);
	app.use("/api", competitions);
	app.use("/api", teams);
    app.use("/api", addresses);
};

module.exports.api = apiController;