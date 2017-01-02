const multiparty = require('multiparty');

let formParser = function(req, res, next) {
    if (req.granted) {
        let form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            if (err) {
                next();
            } else {
                req.files = files;
                if (req.url.startsWith("/competitions")) {
					req.body.name = fields.name[0];
					req.body.description = fields.description[0];
					req.body.country = fields.country[0];
					req.body.sport = fields.sport[0];
					if (fields.logo && fields.logo[0]) {
                        req.body.logo = fields.logo[0];
                    }
				} else if (req.url.startsWith("/teams")) {
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
					if (fields.background && fields.background[0]) {
                        req.body.background = fields.background[0];
                    }
                    if (fields.address && fields.address[0]) {
                        req.body.address = fields.address[0];
                    } else {
                        req.body.address = -1;
                    }
                } else if (req.url.startsWith("/users")) {
                    req.body.date_of_birth = fields.date_of_birth[0];
                    req.body.national_registry_number = fields.national_registry_number[0];
                    req.body.phone = fields.phone[0];
                    req.body.street = fields.street[0];
                    req.body.number = fields.number[0];
                    req.body.postal = fields.postal[0];
                    req.body.city = fields.city[0];
                    req.body.country = fields.country[0];
                    if (fields.avatar && fields.avatar[0]) {
                        req.body.avatar = fields.avatar[0];
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