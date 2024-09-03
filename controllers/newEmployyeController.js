const newAddEmployee = require("../models/newEmployeeSchema");

exports.newAddEmployee = async (req, res) =>{
    const {
        fullName
    } = req.body ;
    try {
        const newExistingEmployee = await newAddEmployee.findOne({ fullName: fullName });
        if(newExistingEmployee){
            return res.status(401).json({message : "This Employee Name Allredy Exist"})
        }
        const newEmployee = new newAddEmployee({
            fullName
        });
        newEmployee .save()
        .then(()=>{
            res.status(200).json({message : "newEmployee data add successfuly"})
        })
    } catch (error) {
        return res.status(404).json({message : "New Employee Not Added"})
        
    }
}



