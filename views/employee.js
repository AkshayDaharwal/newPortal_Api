const express = require("express");

const router = express.Router();

const {employeFetchAll, employeFetch  , employeeLogin , employeDelete , employeUpdate , imageUpload , imgSize} = require('../controllers/employeeController.js')

router.get("/fetchall",employeFetchAll , imageUpload , imgSize);

router.get("/fetchemp/:id",employeFetch , imageUpload , imgSize);

router.post("/addEmp", imageUpload , imgSize); //addEmployee

router.post("/empLogin", employeeLogin);

router.delete('/empdelete/:id', employeDelete);

router.put('/update/:id', employeUpdate);

module.exports = router;







