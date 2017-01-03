const mongoose = require('mongoose'),
    mongooseHidden = require('mongoose-hidden')({
        defaultHidden: {
            __v: true,
			created_at: true,
            updated_at: true
        }
    }),
    autoIncrement = require('mongoose-increment');

let gameSchema = new mongoose.Schema({
	away: {
        type: Number,
        ref: 'Team',
        required: true
    },
	banner: {
		type: String,
		required: true,
		trim: true
	},
    date: {
        type: Date,
        required: true
    },
    home: {
        type: Number,
        ref: 'Team',
        required: true
    },
    importance: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    }
}, {
    _id: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

gameSchema.plugin(autoIncrement, {
	modelName: 'Game',
	fieldName: '_id'
});
gameSchema.plugin(mongooseHidden);

gameSchema.index({
    home: 1,
    away: 1,
    date: 1
}, {
    unique: true
});

module.exports = gameSchema;