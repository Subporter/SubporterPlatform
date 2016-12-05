const mongoose = require("mongoose"),
	config = require("./subporter.config");

let gracefulShutdown,
	db = config.db_dev;

if (process.env.NODE_ENV === 'production') {
	db = config.db_prod;
}

mongoose.connect(db);

/* Connection events */
mongoose.connection.on("connected", () => {
	console.log("Mongoose connected to " + db);
});

mongoose.connection.on("error", (err) => {
	console.log("Mongoose connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
	console.log("Mongoose disconnected");
});

/* Restart events */
/* On restart/termination */
gracefulShutdown = (msg, callback) => {
	mongoose.connection.close(() => {
		console.log("Mongoose disconnected through " + msg);
		callback();
	});
};

/* Nodemon restart */
process.once("SIGUSR2", () => {
	gracefulShutdown("Nodemon restart", () => {
		process.kill(process.pid, "SIGUSR2");
	});
});

/* Termination */
process.on("SIGINT", function () {
	gracefulShutdown("App termination", () => {
		process.exit(0);
	});
});

/* Schemas and models */
require("../server/models/Users");