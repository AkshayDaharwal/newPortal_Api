//const { default: mongoose } = require('mongoose');
const mongoose = require("mongoose");


const { Schema } = mongoose;

const employeeData = new Schema(
  {
    employeId: String,

    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    contact: {
      type: Number,
      require: true,
    },
    emergencyNo: {
      type: Number,
      require: true,
    },
    position: {
      type: String,
      require: true,
    },
    joiningDate: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
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
      require: true,
    },
    imgUrl: {
      type: String,
      require: true,
    },
  },
  { collection: "EmployeeData" }
);




module.exports = mongoose.model("EmployeeData", employeeData);

