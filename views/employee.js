const express = require("express");

const router = express.Router();

const {employeFetchAll, employeFetch ,addEmployee , employeeLogin , employeDelete , employeUpdate , imageUpload} = require('../controllers/employeeController.js')

router.get("/fetchall",employeFetchAll);

router.get("/fetchemp/:id",employeFetch);

router.post("/addEmp", imageUpload,  addEmployee);

router.post("/empLogin", employeeLogin);

router.delete('/empdelete/:id', employeDelete);

router.put('/update/:id', employeUpdate);

module.exports = router;







