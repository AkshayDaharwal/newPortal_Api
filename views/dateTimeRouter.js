const express = require('express');
const router = express.Router();
const timeController = require('../controllers/dateTimeController');

// Route to get all shifts
router.get('/getallclock', timeController.getAllClocks);

router.post('/starclock', timeController.startClock);

router.put('/stopclock/:id', timeController.stopClock);




module.exports = router ;

