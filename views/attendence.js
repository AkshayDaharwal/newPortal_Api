const express = require("express");

const router = express.Router();

const attendanceController = require('../controllers/attendenceController.js')

router.get("/fetch/employeId",attendanceController.getAttendence );

router.get("/fetchall", attendanceController.getAllAttendance);

router.post("/addAttendence", attendanceController.addAttendence) ;

router.post("/Absent", attendanceController.Absent)


module.exports = router ;

