//const { default: mongoose } = require('mongoose');
const mongoose = require("mongoose");

const { Schema } = mongoose;

const employeeData = new Schema(
  {
    employeId: String,
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    emergencyNo: {
      type: Number,
    },
    position: {
      type: String,
    },
    joiningDate: {
      type: String,
    },
    address: {
      type: String,
    },
    salary: {
      type: Number,
      require: true,
    },
    aadharcard: {
      type: String,
      require: true,
    },
    pancard: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
  },
  { collection: "EmployeeData" }
);

module.exports = mongoose.model("EmployeeData", employeeData);

