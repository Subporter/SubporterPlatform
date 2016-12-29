const users = require('./users'),
    addresses = require('./addresses'),
    sports = require('./sports'),
    countries = require('./countries'),
    competitions = require('./competitions'),
    teams = require('./teams'),
    subscriptions = require('./subscriptions'),
    games = require('./games'),
    loans = require('./loans');

let apiController = function(app) {
    app.use('/api', users);
    app.use('/api', addresses);
    app.use('/api', sports);
    app.use('/api', countries);
    app.use('/api', competitions);
    app.use('/api', teams);
    app.use('/api', subscriptions);
    app.use('/api', games);
    app.use('/api', loans);
};

module.exports.api = apiController;