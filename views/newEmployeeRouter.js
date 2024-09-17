const express = require('express') ;

const router = express.Router();

const { newEmployeeGet ,newEmpGetAll, newEmployeeDelete , newEmployeeAdd , newEmpattendance} = require('../controllers/newEmployyeController')


router.get("/newEmpGet/:employeeId", newEmployeeGet) ;

router.get("/newEmpgetAll", newEmpGetAll )

router.post("/newAddEmployee" , newEmployeeAdd) //newAddEmployee

router.post("/newEmpattendance", newEmpattendance)

router.delete("/newEmpDelete/:id", newEmployeeDelete )



module.exports = router ;


