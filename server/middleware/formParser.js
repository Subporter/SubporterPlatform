const multiparty = require('multiparty'),
    formFields = require('../helpers/formFields');

let formParser = (req, res, next) => {
    if (req.granted) {
        let form = new multiparty.Form();
        form.parse(req, (err, fields, files) => {
            if (err) {
                next();
            } else {
                req.files = files;
                if (req.url.startsWith("/competitions")) {
                    formFields.competitions(req, fields);
                } else if (req.url.startsWith("/teams")) {
                    formFields.teams(req, fields);
                } else if (req.url.startsWith("/subscriptions")) {
                    formFields.subscriptions(req, fields);
                } else if (req.url.startsWith("/games")) {
                    formFields.games(req, fields);
                } else if (req.url.startsWith("/users")) {
                    formFields.users(req, fields);
                }
                next();
            }
        });
    } else {
        next();
    }
};

module.exports = formParser;