const Employee = require("../models/employeeModel");
const Attendance = require("../models/attendenceSchema");


// Get attendance for an employee
exports.getAttendence = async (req, res) => {
  const employeeId = req.params.id;
  console.log(employeeId);

  try {
    const attendanceRecords = await Attendance.find({ employeeId });
    console.log(attendanceRecords);
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find(); // Fetch all attendance records
    console.log(attendanceRecords);
    res.status(200).json(attendanceRecords); // Send the records as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
};


exports.addAttendance = async (req, res) => {
  const { employeeId, status } = req.body;
  console.log({ employeeId, status });

  try {
    // Find the employee by _id (assuming employeId is the ObjectId)
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Validate the status
    const validStatus = ['Present', 'Absent', 'SickLeave', 'CasualLeave', 'Holiday', 'Halfday'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: 'Invalid attendance status' });
    }

    // Check if there's already an attendance record for the same employee and date
    const existingAttendance = await Attendance.findOne({
      employeeId: employee._id,
      date: new Date().setHours(0, 0, 0, 0) // Ensures the check is for the same day
    });

    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance for today has already been recorded' });
    }

    // Create a new attendance record based on the status
    const newAttendance = new Attendance({
      employeeId: employee._id, // Ensure it's the ObjectId
      status,
    });

    await newAttendance.save();
    res.status(201).json({ message: `${status} attendance recorded successfully`, attendance: newAttendance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// real 
// exports.addAttendence = async (req, res) => {
//   const { employeId, status } = req.body;
//   console.log({ employeId, status });

//   try {
//     // Find the employee by _id (assuming employeId is the ObjectId)
//     const employee = await Employe.findById(employeId);
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     // Create a new attendance record
//     const newAttendance = new Attendance({
//       employeId: employee._id, // Ensure it's the ObjectId
//       status,
//     });

//     await newAttendance.save();
//     res.status(201).json(newAttendance);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// exports.addAttendence = async (req, res) => {
//   const { employeId, status } = req.body;
//   console.log({ employeId, status });

//   try {
//     const employee = await Employe.findById(employeId); // Find by ObjectId
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     const newAttendance = new Attendance({
//       employeId, // Already an ObjectId reference
//       status,
//     });

//     await newAttendance.save();
//     res.status(201).json(newAttendance);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }

//   try {
//     const employee = await Employe.findOne({ _id: employeId }); // Assuming employeId is _id
//     console.log(employee);

//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     const newAttendance = new Attendance({
//       employeId: employee._id,
//       status,
//     });

//     await newAttendance.save();
//     res.status(201).json(newAttendance);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// exports.Absent = async (req, res) => {
//   const { employeId, status } = req.body;

//   try {
//     const employee = await Employe.findOne({ employeId });
//     console.log(employee);

//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found in absent" });
//     }

//     if (status !== "absent") {
//       return res.status(400).json({ message: "Invalid status for absent" });
//     }

//     const newAttendance = new Attendance({
//       employeId : employee._id,
//       status,
//     });

//     await newAttendance.save();
//     res.status(201).json(newAttendance);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };





