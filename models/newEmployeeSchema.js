const mongoose = require("mongoose");

const addEmployee = new mongoose.Schema(
  {
    employeId: String,

    fullName: {
      type: String,
      rquire: true,
    },
  },
  { collection: "newEmployeeData" }
);

module.exports = mongoose.model("newAddEmployee", addEmployee);
