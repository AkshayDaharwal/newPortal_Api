//const { default: mongoose } = require('mongoose');
const mongoose = require("mongoose");

const { Schema } = mongoose;

const internData = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    contact: {
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
    batch: {
      type: String,
    },
    correspondingAddress: {
      type: String,
    },
    tolalFees: {
      type: Number,
    },
    Installment: {
      type: Number,
    },
    dueFees: {
      type: Number,
    },
    domain: {
      type: String,
    },
    trainername: {
      type: String,
    },
  },
  { collection: "InternData" }
);

module.exports = mongoose.model("InternData", internData);
