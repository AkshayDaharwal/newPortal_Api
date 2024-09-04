const express = require('express') ;

const router = express.Router();

const newAddEmployeeController = require('../controllers/newEmployyeController')


router.post("/newAddEmployee", newAddEmployeeController.newAddEmployee)


module.exports = router ;


