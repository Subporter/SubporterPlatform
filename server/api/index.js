const sports = require("./sports");
const teams = require("./teams");
const competitions = require("./competitions");
const users = require("./users");

let apiController = function (app) {
    app.use("/api", sports);
    app.use("/api", teams);
    app.use("/api", competitions);
    app.use("/api", users);
};

module.exports.api = apiController;