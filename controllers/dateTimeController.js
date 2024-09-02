// const Clock = require('../models/dateTimeShema');
// // const Employe = require("../models/employeeModel")

// // (Optional) Get all clock entries
// exports.getAllClocks = async (req, res) => {
//     try {
//         const clocks = await Clock.find();
//         res.json(clocks);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// let timerValue ;
// // Start the clock
// exports.Clock = async (req, res) =>
//     // try {
//     //     const startTime = new Date();
//     //     const clock = new Clock({ startTime });
//     //     await clock.save();
//     //     res.status(201).json(clock);
//     // } catch (err) {
//     //     res.status(500).json({ error: err.message });
//     // }
//     {
//         const { timer } = req.body;

//         try {
//             if (timer !==0 ) {
//                 timerValue = new Clock([
//                     timer
//                 ]);  // Update the in-memory timer valu

//             }
//             await timerValue.save()
//             res.status(200).json({ message: 'Timer value saved successfully', timerValue  });

//         } catch (error) {
//             res.status(400).json({ message: 'Invalid request: timer value is missing' });
//         }
//         //  else {
//         //
//         // }
// };

// // // Stop the clock
// // exports.stopClock = async (req, res) => {
// //     try {
// //         const { id } = req.params;
// //         const stopTime = new Date();

// //         const clock = await Clock.findByIdAndUpdate(id, { stopTime }, { new: true });

// //         if (!clock) {
// //             return res.status(404).json({ error: 'Clock entry not found' });
// //         }

// //         res.json(clock);
// //     } catch (err) {
// //         res.status(500).json({ error: err.message });
// //     }
// // };

// // const attendanceModel = require('../models/dateTimeShema');

// // exports.getAllRecords = (req, res) => {
// //     const records = attendanceModel.getAllRecords();
// //     res.status(200).json(records);
// // };

// // exports.clockIn = (req, res) => {
// //     const { userId } = req.body;
// //     const startTime = new Date();
// //     const record = attendanceModel.createRecord(userId, startTime);
// //     res.status(200).json({ message: 'Clocked in', record });
// // };

// // exports.clockOut = (req, res) => {
// //     const { userId } = req.body;
// //     const stopTime = new Date();
// //     const record = attendanceModel.updateRecord(userId, stopTime);
// //     if (record) {
// //         res.status(200).json({ message: 'Clocked out', record });
// //     } else {
// //         res.status(400).json({ message: 'No clock-in record found or already clocked out' });
// //     }
// // };

// // Method to fetch all shifts or a specific shift by ID
// // exports.getShifts = async (req, res) => {
// //     try {
// //         const { id } = req.params;

// //         if (id) {
// //             // Fetch a specific shift by ID
// //             const shift = await DateTime.findById(id);

// //             if (!shift) {
// //                 return res.status(404).json({ message: 'Shift not found' });
// //             }
// //             res.json(shift);
// //         } else {
// //             // Fetch all shifts
// //             const shifts = await DateTime.find();
// //             res.json(shifts);
// //         }
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // exports.startShift = async (req, res) => {
// //     try {
// //         const currentDateTime = new Date();

// //         // Save the current date and time as the start time to the database
// //         const newDateTime = new DateTime({ startAt: currentDateTime });
// //         await newDateTime.save();

// //         res.json({
// //             message: 'Shift started',
// //             startAt: currentDateTime
// //         });
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // // Method to end a shift (record end time)
// // exports.endShift = async (req, res) => {

// //     try {
// //         const { id } = req.params;
// //         const currentDateTime = new Date();

// //         // Find the entry by ID and update the end time
// //         const dateTime = await DateTime.findByIdAndUpdate(id, { endAt: currentDateTime }, { new: true });

// //         if (!dateTime) {
// //             return res.status(404).json({ message: 'Shift not found' });
// //         }

// //         res.json({
// //             message: 'Shift ended',
// //             startAt: dateTime.startAt,
// //             endAt: currentDateTime
// //         });
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // exports.startBreak = async (req, res) =>{
// //         try {
// //             const {id} = req.params ;
// //             const currentDateTime = new Date();

// //             const dateTime = await DateTime.findByIdAndUpdate (id, {breakStart : currentDateTime}, {new : true})

// //             if(!dateTime){
// //                 return res.status(404).json({message : "Start break not found !"})
// //             }

// //             return res.status(200).json({
// //                 message : "Break started",
// //                 breakStart : currentDateTime
// //             })

// //         } catch (error) {
// //             return res.status(500).json({message : error.message})
// //         }
// // }

// // exports.endBreak = async (req,res) =>{
// //         try {
// //             const {id} = req.params;
// //             const currentDateTime = new Date();

// //             const dateTime = await DateTime.findByIdAndUpdate(id,{endBreak: currentDateTime}, {new : true})

// //             if(!dateTime){
// //                 return res.status(500).json({message : "end Break not found !"})
// //             }
// //             return res.status(200).json({ message: "end Break successfuly", endBreak : currentDateTime})
// //         } catch (error) {
// //             return res.status(500).json({ message : error.message})
// //         }
// // }


// new code 

const TimeLog = require("../models/dateTimeShema");

// Route to start the timer
exports.startTime = async (req, res) => {
  const { employeeId } = req.body;

  const newTimeLog = new TimeLog({
    employeeId,
    startTime: new Date(),
  });

  await newTimeLog.save();
  res.status(201).send("Timer started");
};

// Route to stop the timer and calculate worked time
exports.stopTime = async (req, res) => {
  const { employeeId } = req.body;

  const timeLog = await TimeLog.findOne({
    employeeId,
    endTime: null, // Find the ongoing session
  });

  if (!timeLog) {
    return res.status(400).send("No active timer found for this employee");
  }

  timeLog.endTime = new Date(); // Capture the current UTC time

  console.log("Start Time:", timeLog.startTime.toISOString());
  console.log("End Time:", timeLog.endTime.toISOString());

  // Calculate the difference between startTime and endTime in seconds
  const diffInSeconds = Math.floor((timeLog.endTime.getTime() - timeLog.startTime.getTime()) / 1000);

  // Convert to hours, minutes, and seconds
  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);
  const seconds = diffInSeconds % 60;

  // Format time as HH:MM:SS
  const formattedTime = [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0")
  ].join(":");

  console.log("Formatted Time:", formattedTime);

  timeLog.totalTimeWorked = formattedTime;

  await timeLog.save();
  res.status(200).json({
    message: "Timer stopped",
    totalTimeWorked: timeLog.totalTimeWorked,
  });
};


// Route to get the total time worked by an employee
exports.getAllTime = async (req, res) => {
  const { employeeId } = req.params;

  const timeLogs = await TimeLog.find({ employeeId });
  const totalWorked = timeLogs.reduce(
    (total, log) => total + (log.totalTimeWorked || 0),
    0
  );

  res.status(200).json({
    employeeId,
    totalTimeWorked: totalWorked,
  });
};



// const TimeLog = require("../models/dateTimeShema");


// function millisecondsToTime(ms) {
//     const seconds = Math.floor(ms / 1000);
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secondsRemaining = seconds % 60;
  
//     return [
//       hours.toString().padStart(2, "0"),
//       minutes.toString().padStart(2, "0"),
//       secondsRemaining.toString().padStart(2, "0"),
//     ].join(":");
//   }

// // Route to start the timer
// exports.startTime = async (req, res) => {
//   const { employeeId } = req.body;

//   const newTimeLog = new TimeLog({
//     employeeId,
//     startTime: new Date(),
//   });

//   await newTimeLog.save();
//   res.status(201).send("Timer started");
// };

// // Route to stop the timer and calculate worked time
// exports.stopTime = async (req, res) => {
//   const { employeeId } = req.body;

//   const timeLog = await TimeLog.findOne({
//     employeeId,
//     stopTime: null, // Find the ongoing session
//   });

//   if (!timeLog) {
//     return res.status(400).send("No active timer found for this employee");
//   }

//   timeLog.stopTime = new Date();
// //   timeLog.totalTimeWorked = (timeLog.endTime - timeLog.startTime) / 1000; // Calculate the time in seconds
// console.log("Start Time" , timeLog.startTime);
// console.log("Stop Time" , timeLog.stopTime);

// const millisecondsWorked = timeLog.stopTime - timeLog.startTime;
// timeLog.totalTimeWorked = millisecondsToTime(millisecondsWorked)




//   await timeLog.save();
//   res.status(200).json({
//     message: "Timer stopped",
//     totalTimeWorked: timeLog.totalTimeWorked,
//   });
// };

// // Route to get the total time worked by an employee
// exports.getAllTime = async (req, res) => {
//   const { employeeId } = req.params;

//   const timeLogs = await TimeLog.find({ employeeId });
//   const totalWorked = timeLogs.reduce(
//     (total, log) => total + (log.totalTimeWorked || 0),
//     0
//   );

//   res.status(200).json({
//     employeeId,
//     totalTimeWorked: totalWorked, // in seconds
//   });
// };
