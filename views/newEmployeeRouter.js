const express = require('express') ;

const router = express.Router();

const {newAddEmployee} = require('../controllers/newEmployyeController')


// router.post("/newAddEmployee", newAddEmployeeController.newAddEmployee)
router.post('/newAddEmployee', newAddEmployee);


module.exports = router ;

