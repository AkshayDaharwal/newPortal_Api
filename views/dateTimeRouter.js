const express = require('express');
const router = express.Router();
const timeController = require('../controllers/dateTimeController');

// Route to get all shifts
router.get('/getAllTime', timeController.getAllTime);

router.post('/startTime', timeController.startTime);

router.post('/stopTime', timeController.stopTime)

// router.put('/stopclock/:id', timeController.stopClock);


module.exports = router ;


