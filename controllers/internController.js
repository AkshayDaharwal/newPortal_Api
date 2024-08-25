const Intern = require('../models/internSchema.js');
// const bcrypt = require('bcrypt');
// const generator = require('generate-password');
// const jwt = require('../config/genrateToken');
const fs = require('fs');
const path = require('path');


exports.addIntern = async(req, res)=>{
  const {  firstName, lastName, email, mobile,emergencyNo, position, joiningDate ,address,currentBalance,remainingBalance , imgUrl} = req.body;

    try {

      console.log("Files Received: ", req.files); 

        if (!req.files || !req.files.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        const file = req.files.file;
        const uploadDir = path.join(__dirname, 'files');

        // Create the directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        const filePath = path.join(uploadDir, Date.now() + "_" + file.name);

        // file.mv(filePath, (error) => {
        //   if (error) {
        //       return res.status(500).json({ message: "Error saving file", error });
        //   }
        file.mv(filePath , (error)=>{
          if (error){
            return res.status(500).json({message : "Error saving file", error})
          }
        })
            
        // Check if the intern already exists
        const existingIntern = await Intern.findOne({ email : email });
    
        if (existingIntern) {
          return res.status(400).json({ message: "intern with this email already exists" });
        }
        
        // Create a new intern document
        const newIntern = new Intern({
          firstName,
          lastName,
          email,
          mobile,
          emergencyNo,
          position,
          joiningDate,
          address,
          currentBalance,
          remainingBalance,
          imgUrl: filePath
         });
    
        // Save the new intern to the database
        await newIntern.save();
        //console.log(Ninfo);
    
        return res.status(200).json({ message: 'intern added successfully', Interndata: newIntern});
    
    } catch (error) {
        console.log(error);
        res.status(500).send("server error- "  + error);
    }
}


exports.internFetch=async(req,res)=>{
   try{
      const id=req.params.id;
       console.log(id);
       if(!id){
        return res.status(400).json({message:"id not found"});
         }
         const intern=await Intern.findById(id);
         console.log(intern);
          if(!intern){
            return res.status(400).json({msg:"intern details not found"});
          }
          return res.status(200).json(intern)
   }  
   catch(error){
     console.log(error);
     return res.status(500).json({message:error.message});
   }
}
exports.allFetchIntern = async (req, res) => {
  try {
    const interns = await Intern.find(); // Fetch all interns from the database
    console.log(interns);
    if (!interns || interns.length === 0) {
      return res.status(404).json({ msg: "No intern details found" });
    }
    return res.status(200).json(interns);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};


exports.internDelete=async(req,res)=>{
   try{
     const id=req.params.id;
     console.log(id);
      if(!id){
        return res.status(400).json({msg:"id is not found"});
      }
      const intern= await Intern.findByIdAndDelete(id);
       if(!intern){
        return res.status(400).json({msg:"intern not found"})
      }
       return res.status(200).json({message:"delete successfully",intern})
   }
   catch(error){
    console.log(error);
    return res.status(500).json({message:error.message});
   }
}

exports.internUpdate = async (req,res)=>{

  try {
    const { firstName="", lastName="", email="", mobile="",emergencyNo="", position="", joiningDate="" ,password="",address="",currentBalance="",remainingBalance=""} = req.body;
    const id = req.params.id;
    console.log(id);
    if(!id){
      return res.status(400).json({ message: " Id is required"})
      
    }
    const intern = await Intern.findOneAndUpdate({_id:id},
      { firstName, lastName, email, mobile,emergencyNo, position, joiningDate ,password,address,currentBalance,remainingBalance})
    // console.log(intern)
     if(!intern){
      return res.status(400).json({ message : "intern not updated"})
      
    }
    return res.status(200).json({ message : "intern data update successfuly",intern })
} catch (error) {
  console.log(error)
}
};
