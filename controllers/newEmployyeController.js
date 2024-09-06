const newAddEmployee = require("../models/newEmployeeSchema");


exports.newEmpGetAll = async (req, res) => {
    try {
      const employees = await newAddEmployee.find(); // Fetch all employee from the database
      console.log(employees);
      if (!employees || employees.length === 0) {
        return res.status(404).json({ msg: "No employees details found" });
      }
      return res.status(200).json(employees);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  };


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
            res.status(200).json({message : "newEmployee data add successfuly", newEmployee})
        })
    } catch (error) {
        return res.status(404).json({message : "New Employee Not Added"})
        
    }
}



