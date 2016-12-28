const multiparty = require('multiparty');

let formParser = function(req, res, next) {
    if (req.granted) {
        let form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            if (err) {
                next();
            } else {
                req.files = files;
                if (req.url.startsWith("/teams")) {
                    req.body.name = fields.name[0];
                    req.body.stadion = fields.stadion[0];
                    req.body.price = fields.price[0];
                    req.body.competition = fields.competition[0];
                    req.body.street = fields.street[0];
                    req.body.number = fields.number[0];
                    req.body.postal = fields.postal[0];
                    req.body.city = fields.city[0];
                    req.body.country = fields.country[0];
                    if (fields.logo && fields.logo[0]) {
                        req.body.logo = fields.logo[0];
                    }
                    if (fields.address && fields.address[0]) {
                        req.body.address = fields.address[0];
                    } else {
                        req.body.address = -1;
                    }
                }
                next();
            }
        });
    } else {
        next();
    }
};

module.exports = formParser;