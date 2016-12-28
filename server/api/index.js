const users = require("./users"),
    sports = require("./sports"),
    countries = require("./countries"),
    competitions = require("./competitions"),
    teams = require("./teams"),
    addresses = require("./addresses"),
    games = require("./games"),
    subscriptions = require("./subscriptions"),
    loans = require("./loans");

let apiController = function(app) {
    app.use("/api", users);
    app.use("/api", sports);
    app.use("/api", countries);
    app.use("/api", competitions);
    app.use("/api", teams);
    app.use("/api", addresses);
    app.use("/api", games);
    app.use("/api", subscriptions);
    //app.use("/api", loans);
};

module.exports.api = apiController;