const express = require("express");

const router = express.Router();

const employeeController = require('../controllers/employeeController.js')

router.post("/addEmp", employeeController.addEmployee);

router.post("/empLogin", employeeController.employeeLogin);

router.get("/fetchall",employeeController.employeFetchAll);

router.get("/fetchemp/:id",employeeController.employeFetch);

router.delete('/empdelete/:id',employeeController.employeDelete);

router.put('/update/:id',employeeController.employeUpdate);

module.exports = router;
