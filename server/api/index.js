const sports = require("./sports");
const teams = require("./teams");
const competitions = require("./competitions");
const users = require("./users");
const countries = require("./countries");

let apiController = function (app) {
	app.use("/api", sports);
    app.use("/api", users);
    app.use("/api", teams);
    app.use("/api/comp", teams);
    app.use("/api",competitions);
    app.use("/api/count", competitions);
    app.use("/api",countries);


};

module.exports.api = apiController;