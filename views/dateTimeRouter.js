const express = require('express');
const router = express.Router();
const timeController = require('../controllers/dateTimeController');

// Route to get all shifts
router.get('/getAllTime', timeController.getAllTime);

router.get('/newEmpTimeGet/:employeeId' , timeController.newEmpTimeGet)

router.post('/startTime', timeController.startTime);

router.post('/stopTime', timeController.stopTime);



module.exports = router ;





