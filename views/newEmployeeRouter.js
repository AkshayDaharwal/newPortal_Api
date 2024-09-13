const express = require('express') ;

const router = express.Router();

const {newEmpAddAttendance ,newEmpGetAll,newEmployeeDelete  } = require('../controllers/newEmployyeController')


router.get("/newEmpgetAll", newEmpGetAll , newEmpAddAttendance)

router.post("/newAddEmployee" , newEmpAddAttendance) //newAddEmployee

router.delete("/newEmpDelete/:id", newEmployeeDelete , newEmpAddAttendance)



module.exports = router ;


