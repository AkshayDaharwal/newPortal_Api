const express = require("express");

const router = express.Router();

const attendanceController = require('../controllers/attendenceController.js')

router.get("/fetch/:employeId",attendanceController.getAttendence );




module.exports = router;

