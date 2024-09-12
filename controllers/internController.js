const Intern = require("../models/internSchema");
// const path = require("path");
const cloudinary = require("cloudinary").v2;

// exports.addIntern = async (req, res) => {
//   const {
//     firstName,
//     lastName,
//     email,
//     contact,
//     emergencyNo,
//     correspondingAddress,
//     batch,
//     joiningDate,
//     tolalFees,
//     Installment,
//     dueFees,
//     domain,
//     trainername,
//   } = req.body;

//   try {
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
//     const filePath = path.join(uploadDir, Date.now() + "_" + file.name);

//     file.mv(filePath, (error) => {
//       if (error) {
//         return res.status(500).json({ message: "Error saving file", error });
//       }
//     });

//     // Check if the intern already exists
//     const existingIntern = await Intern.findOne({ email: email });

//     if (existingIntern) {
//       return res
//         .status(400)
//         .json({ message: "intern with this email already exists" });
//     }

//     // Create a new intern document
//     const newIntern = new Intern({
//       firstName,
//       lastName,
//       email,
//       contact,
//       emergencyNo,
//       correspondingAddress,
//       batch,
//       joiningDate,
//       tolalFees,
//       Installment,
//       dueFees,
//       domain,
//       trainername,
//       aadharcard: filePath,
//       imgUrl: filePath,
//     });

//     // Save the new intern to the database
//     await newIntern.save();
//     //console.log(Ninfo);

//     return res
//       .status(200)
//       .json({ message: "intern added successfully", Interndata: newIntern });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("server error- " + error);
//   }
// };

function FileTypeSupported(type, supportedType) {
  return supportedType.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
  const options = { folder };

  options.resource_type = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.internImageUpload = async (req, res) => {
  try {
    const {
      employeId,
      firstName,
      lastName,
      email,
      contact,
      emergencyNo,
      correspondingAddress,
      batch,
      joiningDate,
      tolalFees,
      Installment,
      dueFees,
      domain,
      trainername,
    } = req.body;

    const file = req.files.imgFile;
    console.log(file);

    const supportedType = ["jpg", "jpeg", "png", "pdf"];

    const fileType = file.name.split(".")[1].toLowerCase();
    console.log("file Type", fileType);

    if (!FileTypeSupported(fileType, supportedType)) {
      return res.status(400).json({ message: "file formate not supported" });
    }

    //upload file to cloudinary
    const response = await uploadFileToCloudinary(file, "RishusInfotech");
    console.log(response);

    //

    try {
      console.log("Files Received ");

      // Check if the intern already exists
      const existingIntern = await Intern.findOne({ email: email });

      if (existingIntern) {
        return res
          .status(400)
          .json({ message: "intern with this email already exists" });
      }

      // Create a new intern document
      const newIntern = new Intern({
        firstName,
        lastName,
        email,
        contact,
        emergencyNo,
        correspondingAddress,
        batch,
        joiningDate,
        tolalFees,
        Installment,
        dueFees,
        domain,
        trainername,
        aadharcard: response.secure_url,
        imgUrl: response.secure_url,
      });

      // Save the new intern to the database
      await newIntern.save();

      return res
        .status(200)
        .json({ message: "intern added successfully", Interndata: newIntern });
    } catch (error) {
      console.log(error);
      res.status(500).send("server error- " + error);
    }
    //db me entry
    const fileData = await Intern.create({
      employeId,
      firstName,
      lastName,
      email,
      contact,
      emergencyNo,
      correspondingAddress,
      batch,
      joiningDate,
      tolalFees,
      Installment,
      dueFees,
      domain,
      trainername,
      aadharcard: response.secure_url,
      imgUrl: response.secure_url,
    });

    res.status(200).json({
      message: "Image successfully uploaded at",
      imgUrl: response.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// exports.addIntern = async(req, res) => {
//   const { firstName, lastName, email, contact, emergencyNo, correspondingAddress, batch, joiningDate, tolalFees, Installment, dueFees, domain, trainername } = req.body;

//   try {
//       console.log("Files Received: ", req.files);

//       if (!req.files || !req.files.file) {
//           return res.status(400).json({ message: "No file uploaded" });
//       }

//       const file = req.files.file;
//       const uploadDir = path.join(__dirname, 'files');

//       // Create the directory if it doesn't exist
//       if (!fs.existsSync(uploadDir)) {
//           fs.mkdirSync(uploadDir);
//       }

//       const fileName = Date.now() + "_" + file.name;
//       const filePath = path.join(uploadDir, fileName);

//       file.mv(filePath, (error) => {
//           if (error) {
//               return res.status(500).json({ message: "Error saving file", error });
//           } else {
//               console.log("File saved at: ", filePath);
//           }
//       });

//       // Construct the relative URL for the files
//       const fileUrl = `/files/${fileName}`;
//       console.log("File URL to be saved: ", fileUrl);

//       // Check if the intern already exists
//       const existingIntern = await Intern.findOne({ email: email });

//       if (existingIntern) {
//           return res.status(400).json({ message: "Intern with this email already exists" });
//       }

//       // Create a new intern document
//       const newIntern = new Intern({
//           firstName,
//           lastName,
//           email,
//           contact,
//           emergencyNo,
//           correspondingAddress,
//           batch,
//           joiningDate,
//           tolalFees,
//           Installment,
//           dueFees,
//           domain,
//           trainername,
//           aadharcard: fileUrl,
//           imgUrl: fileUrl
//       });

//       console.log("New Intern Data: ", newIntern);

//       // Save the new intern to the database
//       await newIntern.save();

//       return res.status(200).json({
//           message: 'Intern added successfully',
//           Interndata: newIntern
//       });

//   } catch (error) {
//       console.log("Error: ", error);
//       res.status(500).send("Server error - " + error);
//   }
// };

exports.internFetch = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    if (!id) {
      return res.status(400).json({ message: "id not found" });
    }
    const intern = await Intern.findById(id);
    console.log(intern);
    if (!intern) {
      return res.status(400).json({ msg: "intern details not found" });
    }
    return res.status(200).json(intern);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

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

exports.internDelete = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    if (!id) {
      return res.status(400).json({ msg: "id is not found" });
    }
    const intern = await Intern.findByIdAndDelete(id);
    if (!intern) {
      return res.status(400).json({ msg: "intern not found" });
    }
    return res.status(200).json({ message: "delete successfully", intern });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.internUpdate = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      email = "",
      mobile = "",
      emergencyNo = "",
      position = "",
      joiningDate = "",
      password = "",
      address = "",
      currentBalance = "",
      remainingBalance = "",
    } = req.body;
    const id = req.params.id;
    console.log(id);
    if (!id) {
      return res.status(400).json({ message: " Id is required" });
    }
    const intern = await Intern.findOneAndUpdate(
      { _id: id },
      {
        firstName,
        lastName,
        email,
        mobile,
        emergencyNo,
        position,
        joiningDate,
        password,
        address,
        currentBalance,
        remainingBalance,
      }
    );
    // console.log(intern)
    if (!intern) {
      return res.status(400).json({ message: "intern not updated" });
    }
    return res
      .status(200)
      .json({ message: "intern data update successfuly", intern });
  } catch (error) {
    console.log(error);
  }
};
