const fs = require('fs'),
    uuid = require('uuid/v1');

let imageSaver = function(req, res, next) {
    if (req.granted) {
        if (!req.files || Object.keys(req.files).length !== 1) {
            next();
        } else {
            let fileName = uuid() + "_" + req.files.upload[0].originalFilename;

            let path = "";
            if (req.url.startsWith("/teams")) {
                path = "teams/";
            } else if (req.url.startsWith("/users")) {
                path = "users/";
            }

            let inStream = fs.createReadStream(req.files.upload[0].path);
            let outStream = fs.createWriteStream('./public/img/uploads/' + path + fileName);
            if (inStream.pipe(outStream)) {
                if (req.url.startsWith("/teams")) {
                    req.body.logo = "/img/uploads/" + path + fileName;
                } else if (req.url.startsWith("/users")) {
                    req.body.avatar = "/img/uploads/" + path + fileName;
                }
                next();
            } else {
                next();
            }
        }
    } else {
        next();
    }
};

module.exports = imageSaver;