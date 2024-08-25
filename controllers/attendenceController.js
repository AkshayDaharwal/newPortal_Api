const Employe = require("../models/employeeModel");
const Attendance = require("../models/attendenceSchema");


// Get attendance for an employee
exports.getAttendence = async (req, res) => {
  const employeId = req.params.employeId;
  console.log(employeId);

  try {
    const attendanceRecords = await Attendance.find({ employeId });
    console.log(attendanceRecords);
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






