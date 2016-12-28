const express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('../config/logger'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    passport = require('passport');

/* Initialize app */

let app = express();

/* View enginge */

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/* Middleware */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

/* Favicon */

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));

/* Static */

app.use(express.static(path.join(__dirname, '../public')));

app.use('/app', express.static(path.join(__dirname, '../public/app')));
app.use('/bower', express.static(path.join(__dirname, '../bower_components')));
app.use('/config', express.static(path.join(__dirname, '../config')));
app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/img', express.static(path.join(__dirname, '../public/img')));
app.use('/js', express.static(path.join(__dirname, '../public/js')));
app.use('/lib', express.static(path.join(__dirname, '../node_modules')));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/vendor', express.static(path.join(__dirname, '../public/vendor')));

/* Passport */

app.use(passport.initialize());

/* Initialize api */

require('./api/index').api(app);

/* Initialize routes */

require('./routes/index').routes(app);

/* Error handlers */
/* 404 error handler */

app.use((req, res, next) => {
    let err = new Error('Not found');
    err.status = 404;
    next(err);
});

/* 401 error handler: unauthorized */

app.use((err, req, res, next) => {
    if (err.name == 'UnauthorizedError') {
        res.status = 401;
        res.json({
            message: err.name + ": " + err.message
        });
    }
});

/* Development error handler: stacktrace */

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/* Production error handler: no stacktrace */

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/* UncaughtException */

process.on('uncaughtException', function(err) {
    if (app.get('env') !== 'development') {
        logger.errorLog.error("Error: ", err);
    } else {
        throw err;
    }
});

module.exports = app;