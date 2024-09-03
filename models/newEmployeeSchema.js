const mongoose = require('mongoose');


const addEmployee = new mongoose.Schema({
    fullName : {
        type : String,
        rquire : true
    }
})



module.exports = mongoose.model("newAddEmployee", addEmployee)

