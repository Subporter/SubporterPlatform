const fs = require('fs'),
    uuid = require('uuid/v1');

let imageSaver = function(req, res, next) {
    if (req.granted) {
        if (!req.files || Object.keys(req.files).length === 0) {
            next();
        } else {
            if (req.files.logo && req.files.logo[0]) {
                let fileName = uuid() + "_" + req.files.logo[0].originalFilename;
                let path = "";
				if (req.url.startsWith("/competitions")) {
					path = "competitions/";
				} else if (req.url.startsWith("/teams")) {
					path = "teams/";
				}
                if (save(req.files.logo[0].path, fileName, path)) {
                    req.body.logo = "/img/uploads/" + path + fileName;
                }
            }
            if (req.files.background && req.files.background[0]) {
                let fileName = uuid() + "_" + req.files.background[0].originalFilename;
                let path = "teams/";
                if (save(req.files.background[0].path, fileName, path)) {
                    req.body.background = "/img/uploads/" + path + fileName;
                }
            }
            if (req.files.avatar && req.files.avatar[0]) {
                let fileName = uuid() + "_" + req.files.avatar[0].originalFilename;
                let path = "users/";
                if (save(req.files.avatar[0].path, fileName, path)) {
                    req.body.avatar = "/img/uploads/" + path + fileName;
                }
            }
            next();
        }
    } else {
        next();
    }
};

let save = function(file, fileName, path) {
    let inStream = fs.createReadStream(file);
    let outStream = fs.createWriteStream('./public/img/uploads/' + path + fileName);
    if (inStream.pipe(outStream)) {
        return true;
    } else {
        return false;
    }
};

module.exports = imageSaver;