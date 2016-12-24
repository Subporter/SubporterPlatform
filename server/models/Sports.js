const mongoose = require('mongoose'),
    sportSchema = require('../schemas/Sports');

let Sport = mongoose.model('Sport', sportSchema, 'Sports');

Sport.addSport = function(body, cb) {
    let sport = new Sport(body);
    sport.save(function(err) {
        if (err) {
            cb(err, false);
        }
        cb(null, true);
    });
};

Sport.getSports = function(cb) {
    Sport.find({}).sort('name').exec(function(err, docs) {
        if (err) {
            cb(err, null);
        }
        cb(null, docs);
    });
};

module.exports = Sport;