//const { default: mongoose } = require('mongoose');
const mongoose = require("mongoose");

const { Schema } = mongoose;

const internData = new Schema(
  {
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
    joiningDate: {
      type: String,
      require: true,
    },
    batch: {
      type: String,
      require: true,
    },
    correspondingAddress: {
      type: String,
      require: true,
    },
    tolalFees: {
      type: Number,
      require: true,
    },
    Installment: {
      type: Number,
      require: true,
    },
    dueFees: {
      type: Number,
      require: true,
    },
    domain: {
      type: String,
      require: true,
    },
    trainername: {
      type: String,
      require: true,
    },
    aadharcard: {
      type: String,
     
    },
    imgUrl: {
      type: String,
      
    },
  },
  { collection: "InternData" }
);

module.exports = mongoose.model("InternData", internData);
