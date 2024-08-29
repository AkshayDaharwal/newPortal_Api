const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  employeId: {
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
    enum: ['Present', 'Absent', 'Halfday'],
    require : true
  },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
