const mongoose = require('mongoose'),
    config = require('./subporter.config');

let gracefulShutdown,
    db = config.db_dev;

if (process.env.NODE_ENV === 'production') {
    db = config.db_prod;
}

mongoose.Promise = global.Promise;
mongoose.connect(db);

/* Connection events */

mongoose.connection.on('connected', () => {
    console.log("Mongoose connected to " + db);
});

mongoose.connection.on('error', (err) => {
    console.log("Mongoose connection error: " + err);
});

mongoose.connection.on('disconnected', () => {
    console.log("Mongoose disconnected");
});

/* Restart events */
/* On restart/termination */

gracefulShutdown = (message, callback) => {
    mongoose.connection.close(() => {
        console.log("Mongoose disconnected through " + message);
        callback();
    });
};

/* Nodemon restart */

process.once('SIGUSR2', () => {
    gracefulShutdown("Nodemon restart", () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

/* Termination */

process.on('SIGINT', function() {
    gracefulShutdown("App termination", () => {
        process.exit(0);
    });
});

/* Schemas and models */

require('../server/models/Users');
require('../server/models/Sports');
require('../server/models/Teams');
require('../server/models/Competitions');
require('../server/models/Loans');
require('../server/models/Addresses');
require('../server/models/Favorites');