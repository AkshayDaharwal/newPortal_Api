const newAddEmployee = require("../models/newEmployeeSchema");


exports.newEmpGetAll = async (req, res) => {
    try {
      const employees = await newAddEmployee.find(); // Fetch all employee from the database
      console.log(employees);
      if (!employees || employees.length === 0) {
        return res.status(404).json({ msg: "No employees details found" });
      }
      return res.status(200).json(employees);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };


// exports.newAddEmployee = async (req, res) =>{
//     const {
//         fullName , status
//     } = req.body ;
//     try {
//         const newExistingEmployee = await newAddEmployee.findOne({ fullName: fullName });
//         if(newExistingEmployee){
//             return res.status(401).json({message : "This Employee Name Allredy Exist"})
//         }
//         const newEmployee = new newAddEmployee({
//             fullName
//         });
//         newEmployee .save()
//         .then(()=>{
//             res.status(200).json({message : "newEmployee data add successfuly", newEmployee})
//         })
//     } catch (error) {
//         return res.status(404).json({message : "New Employee Not Added"})
        
//     }
// }

exports.newEmployeeDelete = async (req, res)=>{

  try {
    
    const id = req.params.id ;
    console.log(id);
    if(!id){
      return res.status(400).json({message : "new Employee id is not found"});

    }
    const employe = await  newAddEmployee.findByIdAndDelete(id)
    if(!employe){
      return res.status(400).json({message : "newEmployee not found"})
    }
    return res.status(200).json({message : "new Employee Deleted successfully", employe})

  } catch (error) {
    return res.status(500).json({ message : error.message})
  }

}


// exports.newEmpAttendance = async (req, res) => {
//   const { employeeId, status } = req.body;
//   console.log({ employeeId, status });

//   try {
//     // Find the employee by _id (assuming employeId is the ObjectId)
//     const employee = await newAddEmployee.findById(employeeId);
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     // Validate the status
//     const validStatus = ['Present', 'Absent', 'SickLeave', 'CasualLeave', 'Holiday', 'Halfday'];
//     if (!validStatus.includes(status)) {
//       return res.status(400).json({ message: 'Invalid attendance status' });
//     }

//     // Check if there's already an attendance record for the same employee and date
//     const existingAttendance = await newAddEmployee.findOne({
//       employeeId: employee._id,
//       date: new Date().setHours(0, 0, 0, 0) // Ensures the check is for the same day
//     });

//     if (existingAttendance) {
//       return res.status(400).json({ message: 'Attendance for today has already been recorded' });
//     }

//     // Create a new attendance record based on the status
//     const newAttendance = new newAddEmployee({
//       employeeId: employee._id, // Ensure it's the ObjectId
//       status,
//     });

//     await newAttendance.save();
//     res.status(201).json({ message: `${status} attendance recorded successfully`, attendance: newAttendance });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


exports.newEmpAddAttendance = async (req, res) => {
  const { fullName, status } = req.body;

  try {
    // Validate the status
    const validStatus = ['Present', 'Absent', 'SickLeave', 'CasualLeave', 'Holiday', 'Halfday'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: 'Invalid attendance status' });
    }

    // Create a new employee attendance record
    const newEmployee = new newAddEmployee({
      fullName,
      status,  // Include the status in the new employee data
      date: new Date(),  // Optional, since date has a default value
    });

    // Save the record to the database
    await newEmployee.save();

    // Return the response with the fullName, ID, date, and status
    res.status(400).json({
      message: "New employee data added successfully",
      newEmployee: {
        fullName: newEmployee.fullName,
        id: newEmployee._id,
        date: newEmployee.date,
        status: newEmployee.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

