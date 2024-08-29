// models/DateTime.js
const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const DateTimeSchema = new Schema({
   startTime: {
        type: Date,
        // default: Date.now,
        require : true
    },
    stopTime: {
        type: Date,
    },
    

},{ timestamps: true });

module.exports = mongoose.model('DateTime', DateTimeSchema);

