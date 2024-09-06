const express = require("express");

const router = express.Router();

const internController = require('../controllers/internController.js')


//router.post("/internLogin", internController.employeeLogin);


router.get("/fetchallintern",internController.allFetchIntern);

router.get("/fetchintern/:id",internController.internFetch)

router.post("/addintern", internController.addIntern);

router.delete('/interndelete/:id',internController.internDelete);

router.put('/updateintern/:id',internController.internUpdate);

module.exports = router;