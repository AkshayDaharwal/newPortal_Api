// models/DateTime.js
const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const DateTimeSchema = new Schema({
    employeeId: {
        type: String,
        required: true,
      },
      startTime: {
        type: Date,
        required: true,
        default: Date.now,
      },
      endTime: {
        type: Date,
      },
      totalTimeWorkedInSeconds: {
        type: String, // Store total worked time in seconds
        default: 0,
      },
      totalTimeWorked: {
        type: String, // Time in HH:MM:SS format
        default: "00:00:00",
      },
    

},{ timestamps: true });

module.exports = mongoose.model('DateTime', DateTimeSchema);

