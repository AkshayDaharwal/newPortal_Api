const express = require('express') ;

const router = express.Router();

const newAddEmployeeController = require('../controllers/newEmployyeController')


router.get("/newEmpgetAll", newAddEmployeeController.newEmpGetAll)

router.post("/newAddEmployee", newAddEmployeeController.newAddEmployee)

router.delete("/newEmpDelete/:id", newAddEmployeeController.newEmployeeDelete)



module.exports = router ;


