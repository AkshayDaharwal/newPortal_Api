const mongoose = require("mongoose");

const addEmployee = new mongoose.Schema(
  {
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


