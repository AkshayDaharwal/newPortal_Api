const Employee = require("../models/employeeModel.js");
const bcrypt = require("bcrypt");
const generator = require("generate-password");
const jwt = require("../config/genrateToken");
const fs = require("fs");
const path = require("path");
const cloudinary = require("cloudinary").v2 ;



exports.employeFetch = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    if (!id) {
      return res.status(400).json({ message: "id not found" });
    }
    const employe = await Employee.findById(id);
    console.log(employe);
    if (!employe) {
      return res.status(400).json({ msg: "employe details not found" });
    }
    return res.status(200).json(employe);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// exports.employeFetchAll = async (req, res) => {
//   try {
//     const employees = await Employee.find(); // Fetch all employees

//     if (!employees.length) {
//       return res.status(404).json({ msg: "No employees found" });
//     }

//     return res.status(200).json(employees);
//   } catch (error) {
//     console.error("Error fetching employees:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

exports.employeFetchAll = async (req, res) => {
  try {
    const employees = await Employee.find(); // Fetch all employee from the database
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

// exports.addEmployee = async (req, res) => {
//   const {
//     employeId,
//     firstName,
//     lastName,
//     email,
//     contact,
//     mobile,
//     emergencyNo,
//     position,
//     joiningDate,
//     correspondenceAddress,
//     currentAddress,
//     salary,
    
//   } = req.body;
//   try {
//     const existingEmployee = await Employee.findOne({ email: email });

//     if (existingEmployee) {
//       return res
//         .status(400)
//         .json({ message: "Employee with this email already exists" });
//     }

//     // Generate a random password
//     const passcode = generator.generate({
//       length: 15,
//       numbers: true,
//     });
//     const password = passcode.toString();

//     // Hash the generated password
//     const hashPassword = await bcrypt.hash(password, 10);
//     console.log("Files Received: ", req.files);

//     if (!req.files || !req.files.file) {
//       return res.status(400).json({
//         message: "No file uploaded", 
//       });
//     }

//     const file = req.files.file;
//     const uploadDir = path.join(__dirname, "files");

//     // Create the directory if it doesn't exist
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir);
//     }
//     const filePath = path.join(uploadDir, Date.now() + "_" + file.name); // "_" + file.name

//     file.mv(filePath, (error) => {
//       if (error) {
//         return res.status(500).json({ message: "Error saving file", error });
//       }
//       const newEmployee = new Employee({
//         employeId,
//         firstName,
//         lastName,
//         email,
//         mobile,
//         correspondenceAddress,
//         currentAddress,
//         contact,
//         emergencyNo,
//         position,
//         joiningDate,
//         salary,
//         aadharcard: filePath,
//         pancard: filePath,
//         imgUrl: filePath,
//       });

//       newEmployee
//         .save()
//         .then(() => {
//           res.status(200).json({
//             message: "Employee added successfully",
//             newEmployee,
//           });
//         })
//         .catch((saveError) => {
//           res.status(400).json({
//             message: "Failed to add employee",
//             error: saveError.message,
//           });
//         });
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("server error- " + error);
//   }
// };

function isFileTypeSupported(type , supportedTypes){
    return supportedTypes.includes(type);
}


async function uploadFileToCloudinary(file, folder , quality) {
  const options = { folder };

  if(quality){
    options.quality = quality ;
  }
  options.resource_type = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}


exports.imageUpload = async (req, res)=>{
  try {
    const { employeId,
      firstName,
      lastName,
      email,
      contact,
      mobile,
      emergencyNo,
      position,
      joiningDate,
      correspondenceAddress,
      currentAddress,
      salary,
    } = req.body ;

    const file = req.files.imgFile ;
    console.log(file)

    const supportedTypes = [ "jpg", "jpeg", "png", "pdf"];

    const fileType = file.name.split('.')[1].toLowerCase();
    console.log("file Type", fileType)
    
    if(!isFileTypeSupported(fileType , supportedTypes)){
      return res.status(400).json({ message : "file formate not supported"})
    } 

    //upload file to cloudinary
    const response = await uploadFileToCloudinary(file, "RishusInfotech")
   console.log(response)

   try {
    console.log("Files Received ");

    // Check if the intern already exists
    const existingEmployee = await Employee.findOne({ email: email });

    if (existingEmployee) {
      return res
        .status(400)
        .json({ message: "intern with this email already exists" });
    }

   

    // Create a new employee document
    const newEmployee = new Employee({
      employeId,
      firstName,
      lastName,
      email,
      mobile,
      correspondenceAddress,
      currentAddress,
      contact,
      emergencyNo,
      position,
      joiningDate,
      salary,
      aadharcard: response.secure_url,
      pancard: response.secure_url,
      imgUrl: response.secure_url,
    });

    // Save the new intern to the database
    await newEmployee.save();

    return res
      .status(200)
      .json({ message: "intern added successfully", employeedata : newEmployee });
  } catch (error) {
    console.log(error);
    res.status(500).send("server error- " + error);
  }
      //db me entry 
      const fileData = await Employee.create({

        employeId,
        firstName,
        lastName,
        email,
        mobile,
        correspondenceAddress,
        currentAddress,
        contact,
        emergencyNo,
        position,
        joiningDate,
        salary,
        aadharcard: response.secure_url,
        pancard: response.secure_url,
        imgUrl: response.secure_url,

      })

      res.status(200).json({message : "Image successfully uploaded at", imgUrl: response.secure_url})
  } catch (error) {
   console.error(error);
   res.status(400).json({
    success : false,
    message : "Something went wrong"
   })
  }
}  

exports.imgSize = async (req,res)=>{

    try {
      const { employeId,
        firstName,
        lastName,
        email,
        contact,
        mobile,
        emergencyNo,
        position,
        joiningDate,
        correspondenceAddress,
        currentAddress,
        salary,
      } = req.body ;
  
      const file = req.files.imgFile ;
      console.log(file)
  
      const supportedTypes = [ "jpg", "jpeg", "png", "pdf"];
  
      const fileType = file.name.split('.')[1].toLowerCase();
      console.log("file Type", fileType)
      
      if(!isFileTypeSupported(fileType , supportedTypes)){
        return res.status(400).json({ message : "file formate not supported"})
      } 
  
      //upload file to cloudinary
      const response = await uploadFileToCloudinary(file, "RishusInfotech", 20)
     console.log(response)
        //db me entry 
        const fileData = await Employee.create({
  
          employeId,
          firstName,
          lastName,
          email,
          mobile,
          correspondenceAddress,
          currentAddress,
          contact,
          emergencyNo,
          position,
          joiningDate,
          salary,
          aadharcard: response.secure_url,
          pancard: response.secure_url,
          imgUrl: response.secure_url,
  
        })
  
        res.status(200).json({message : "Image successfully uploaded at", imgUrl: response.secure_url})
      
    } catch (error) {
      console.error(error);
   res.status(400).json({
    success : false,
    message : "Something went wrong in ImgSize"
   })
    }
}

exports.employeeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log(role);

    // Find employee by email
    const employee = await Employee.findOne({ email });

    // Check if employee exists
    if (!employee) {
      return res.status(400).json({ msg: "Employee details not found" });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, employee.password);

    if (passwordMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    // Login successful

    token = jwt.generateToken();

    return res.status(200).json({
      success: "employee logged In",
      Token: token,
      email: email,
    });
  } catch (error) {
    console.error("Error in employeeLogin:", error.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

exports.employeDelete = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    if (!id) {
      return res.status(400).json({ msg: "id is not found" });
    }
    const employe = await Employee.findByIdAndDelete(id);
    if (!employe) {
      return res.status(400).json({ msg: "employe not found" });
    }
    return res.status(200).json({ message: "delete successfully", employe });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.employeUpdate = async (req, res) => {
  try {
    const {
      employeId = "",
      firstName = "",
      lastName = "",
      email = "",
      mobile = "",
      emergencyNo = "",
      position = "",
      joiningDate = "",
      password = "",
      address = "",
    } = req.body;
    const id = req.params.id;
    console.log(id);
    if (!id) {
      return res.status(400).json({ message: " Id is required" });
    }
    const employe = await Employee.findOneAndUpdate(
      { _id: id },
      {
        employeId,
        firstName,
        lastName,
        email,
        mobile,
        emergencyNo,
        position,
        joiningDate,
        password,
        address,
      }
    );
    console.log(employe);
    if (!employe) {
      return res.status(400).json({ message: "employe not updated" });
    }
    return res
      .status(200)
      .json({ message: "employe data update successfuly", employe });
  } catch (error) {
    console.log(error);
  }
};


