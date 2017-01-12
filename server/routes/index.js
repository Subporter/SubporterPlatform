const path = require('path'),
    authenticate = require('./authenticate');

let routesController = (app) => {
    app.use('/', authenticate);

    app.get('*', (req, res) => {
        let index = path.resolve(__dirname, '../../public/index.html');
        res.sendFile(index);
    });
};

module.exports.routes = routesController;