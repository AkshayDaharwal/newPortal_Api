const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Employee',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'SickLeave', 'CasualLeave', 'Holiday', 'Halfday'],
    require : true
  },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
