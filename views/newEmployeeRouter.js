const express = require('express') ;

const router = express.Router();

const newAddEmployeeController = require('../controllers/newEmployyeController')


router.get("/newAddEmployee", newAddEmployeeController.newAddEmployee)



module.exports = router ;

