const sports = require("./sports");
const users = require("./users");

let apiController = function (app) {
    app.use("/api", sports);
    app.use("/api", users);
};

module.exports.api = apiController;