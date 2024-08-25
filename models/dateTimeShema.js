// models/DateTime.js
const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const DateTimeSchema = new Schema({
    startAt: {
        type: Date,
        default: Date.now
    },
    endAt: {
        type: Date,
        default: null // End time can be null initially
    },
    breakStart: {
        type: Date,
        default: null
    },
    breckEnd:{
        type: Date,
        default: Date.now,
        
    },

});

module.exports = mongoose.model('DateTime', DateTimeSchema);

