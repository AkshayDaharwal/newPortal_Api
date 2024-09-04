
// // new code 

// const TimeLog = require("../models/dateTimeShema");

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
//     endTime: null, // Find the ongoing session
//   });

//   if (!timeLog) {
//     return res.status(400).send("No active timer found for this employee");
//   }

//   timeLog.endTime = new Date(); // Capture the current UTC time

//   console.log("Start Time:", timeLog.startTime.toISOString());
//   console.log("End Time:", timeLog.endTime.toISOString());

//   // Calculate the difference between startTime and endTime in seconds
//   const diffInSeconds = Math.floor((timeLog.endTime.getTime() - timeLog.startTime.getTime()) / 1000);

//   // Convert to hours, minutes, and seconds
//   const hours = Math.floor(diffInSeconds / 3600);
//   const minutes = Math.floor((diffInSeconds % 3600) / 60);
//   const seconds = diffInSeconds % 60;

//   // Format time as HH:MM:SS
//   const formattedTime = [
//     hours.toString().padStart(2, "0"),
//     minutes.toString().padStart(2, "0"),
//     seconds.toString().padStart(2, "0")
//   ].join(":");

//   console.log("Formatted Time:", formattedTime);

//   timeLog.totalTimeWorked = formattedTime;

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
//     totalTimeWorked: totalWorked,
//   });
// };

// new new new code 

// const TimeLog = require("../models/dateTimeShema");

// // Route to start the timer
// exports.startTime = async (req, res) => {
//   const { employeeId } = req.body;

//   let timeLog = await TimeLog.findOne({ employeeId, endTime: null });

//   if (!timeLog) {
//     // Create a new time log if no active session is found
//     timeLog = new TimeLog({
//       employeeId,
//       startTime: new Date(),
//       totalTimeWorkedInSeconds: 0, // Initialize total time worked in seconds
//     });
//   } else {
//     // If an active session is found, continue from where it left off
//     timeLog.startTime = new Date();
//   }

//   await timeLog.save();
//   res.status(201).json({ message: "Timer started or resumed" });
// };

// // Route to stop the timer and calculate worked time
// exports.stopTime = async (req, res) => {
//   const { employeeId } = req.body;

//   const timeLog = await TimeLog.findOne({
//     employeeId,
//     endTime: null, // Find the ongoing session
//   });

//   if (!timeLog) {
//     return res.status(400).send("No active timer found for this employee");
//   }

//   timeLog.endTime = new Date(); // Capture the current UTC time

//   console.log("Start Time:", timeLog.startTime.toISOString());
//   console.log("End Time:", timeLog.endTime.toISOString());

//   // Calculate the difference between startTime and endTime in seconds
//   const diffInSeconds = Math.floor((timeLog.endTime.getTime() - timeLog.startTime.getTime()) / 1000);

//   // Add the newly calculated time to the previously worked time
//   timeLog.totalTimeWorkedInSeconds += diffInSeconds;

//   // Convert to hours, minutes, and seconds
//   const hours = Math.floor(timeLog.totalTimeWorkedInSeconds / 3600);
//   const minutes = Math.floor((timeLog.totalTimeWorkedInSeconds % 3600) / 60);
//   const seconds = timeLog.totalTimeWorkedInSeconds % 60;

//   // Format time as HH:MM:SS
//   const formattedTime = [
//     hours.toString().padStart(2, "0"),
//     minutes.toString().padStart(2, "0"),
//     seconds.toString().padStart(2, "0")
//   ].join(":");

//   console.log("Formatted Time:", formattedTime);

//   timeLog.totalTimeWorked = formattedTime;

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
//     (total, log) => total + (log.totalTimeWorkedInSeconds || 0),
//     0
//   );

//   // Convert to hours, minutes, and seconds
//   const hours = Math.floor(totalWorked / 3600);
//   const minutes = Math.floor((totalWorked % 3600) / 60);
//   const seconds = totalWorked % 60;

//   // Format time as HH:MM:SS
//   const formattedTotalTime = [
//     hours.toString().padStart(2, "0"),
//     minutes.toString().padStart(2, "0"),
//     seconds.toString().padStart(2, "0")
//   ].join(":");

//   res.status(200).json({
//     employeeId,
//     totalTimeWorked: formattedTotalTime,
//   });
// };


// 2nd new code 

const TimeLog = require("../models/dateTimeShema");

// Route to start the timer
exports.startTime = async (req, res) => {
  
  const { employeeId } = req.body


  // Find the latest time log entry for the employee
  let timeLog = await TimeLog.findOne({ employeeId, endTime: null });

  if (!timeLog) {
    // If no active session is found, create a new one
    console.log("Starting a new timer session");
    timeLog = new TimeLog({
      employeeId,
      startTime: new Date(),
      totalTimeWorkedInSeconds: 0, // Initialize total time worked in seconds
    });
  } else {
    // If an active session is found, it means the timer was not stopped correctly
    return res.status(400).json({ message: "An active session already exists" });
  }

  await timeLog.save();
  res.status(201).json({ message: "Timer started" });
};

// Route to stop the timer and calculate worked time
exports.stopTime = async (req, res) => {
  const { employeeId } = req.body;

  // Find the latest active time log entry
  const timeLog = await TimeLog.findOne({ employeeId, endTime: null });

  if (!timeLog) {
    return res.status(400).send("No active timer found for this employee");
  }

  timeLog.endTime = new Date(); // Capture the current UTC time

  console.log("Start Time:", timeLog.startTime.toISOString());
  console.log("End Time:", timeLog.endTime.toISOString());

  // Calculate the difference between startTime and endTime in seconds
  const diffInSeconds = Math.floor((timeLog.endTime.getTime() - timeLog.startTime.getTime()) / 1000);

  console.log("Time difference in seconds:", diffInSeconds);

  // Add the newly calculated time to the previously worked time
  timeLog.totalTimeWorkedInSeconds += diffInSeconds;

  console.log("Total time worked in seconds:", timeLog.totalTimeWorkedInSeconds);

  // Convert to hours, minutes, and seconds
  const hours = Math.floor(timeLog.totalTimeWorkedInSeconds / 3600);
  const minutes = Math.floor((timeLog.totalTimeWorkedInSeconds % 3600) / 60);
  const seconds = timeLog.totalTimeWorkedInSeconds % 60;

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
  const totalWorkedInSeconds = timeLogs.reduce(
    (total, log) => total + (log.totalTimeWorkedInSeconds || 0),
    0
  );

  console.log("Total worked time in seconds across all logs:", totalWorkedInSeconds);

  // Convert to hours, minutes, and seconds
  const hours = Math.floor(totalWorkedInSeconds / 3600);
  const minutes = Math.floor((totalWorkedInSeconds % 3600) / 60);
  const seconds = totalWorkedInSeconds % 60;

  // Format time as HH:MM:SS
  const formattedTotalTime = [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0")
  ].join(":");

  res.status(200).json({
    employeeId,
    totalTimeWorked: formattedTotalTime,
  });
};
