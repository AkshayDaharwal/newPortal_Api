const express = require("express");

const router = express.Router();

const attendanceController = require('../controllers/attendenceController.js')

router.get("/fetch/:id",attendanceController.getAttendence );

router.get("/fetchall", attendanceController.getAllAttendance);

router.post("/addAttendence", attendanceController.addAttendance) ;



module.exports = router ;


