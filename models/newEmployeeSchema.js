const mongoose = require("mongoose");

const addEmployee = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Employee',
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Present', 'Absent', 'SickLeave', 'CasualLeave', 'Holiday', 'Halfday'],
      require: true,
    },
  },
  { collection: "newEmployeeData" }
);

module.exports = mongoose.model("newAddEmployee", addEmployee);


