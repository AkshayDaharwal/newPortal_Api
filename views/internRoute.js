const express = require("express");

const router = express.Router();

const {allFetchIntern, internFetch  , internDelete , internUpdate , internImageUpload} = require('../controllers/internController.js')


//router.post("/internLogin", internController.employeeLogin);


router.get("/fetchallintern",allFetchIntern , internImageUpload);

router.get("/fetchintern/:id",internFetch , internImageUpload)

router.post("/addintern"  , internImageUpload); 

router.delete('/interndelete/:id',internDelete);

router.put('/updateintern/:id',internUpdate);

module.exports = router;
