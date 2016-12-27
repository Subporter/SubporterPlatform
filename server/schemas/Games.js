const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')({
        defaultHidden: {
            __v: true
        }
    }),
    autoIncrement = require('mongoose-increment');

let gameSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    home: {
        type: Number,
        ref: 'Team',
        required: true
    },
	away: {
        type: Number,
        ref: 'Team',
        required: true
    }
}, {
    _id: false
});

gameSchema.plugin(autoIncrement, {
	modelName: 'Game',
	fieldName: '_id'
});
gameSchema.plugin(mongooseHidden);

module.exports = gameSchema;