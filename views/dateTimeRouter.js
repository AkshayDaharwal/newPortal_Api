const express = require('express');
const router = express.Router();
const timeController = require('../controllers/dateTimeController');

// Route to get all shifts
router.get('/shifts', timeController.getShifts);

// Route to get a specific shift by ID
router.get('/shifts/:id', timeController.getShifts);

router.post('/startshift', timeController.startShift);

router.post('/endshift/:id', timeController.endShift);

router.post('/startbreak', timeController.startBreak);

router.post('/endbreak/:id', timeController.endBreak);



module.exports = router ;

