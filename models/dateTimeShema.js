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
       
      },
      endTime: {
        type: Date,
      },
      totalTimeWorkedInSeconds: {
        type: Number, // Store total worked time in seconds
        default: 0,
      },
      totalTimeWorked: {
        type: String, // Time in HH:MM:SS format
       
      },
    

},{ timestamps: true });

module.exports = mongoose.model('DateTime', DateTimeSchema);

