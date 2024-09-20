
const TimeLog = require("../models/dateTimeShema");

exports.startTime = async (req, res) => {
  const { employeeId } = req.body;

  // Find the latest time log entry for the employee
  let timeLog = await TimeLog.findOne({ employeeId });

  if (!timeLog) {
    // If no entry is found, create a new one
    timeLog = new TimeLog({
      employeeId,
      startTime: new Date(),
      totalTimeWorkedInSeconds: 0, // Initialize total time worked in seconds
    });
    console.log("Starting a new timer session");
  } else {
    // If an entry exists, just update the start time to resume
    timeLog.startTime = new Date();
    console.log("Resuming the timer session");
  }

  await timeLog.save();
  res.status(201).json({ message: "Timer started or resumed", timeLog });
};

// Route to stop the timer and accumulate worked time
exports.stopTime = async (req, res) => {
  const { employeeId } = req.body;

  // Find the latest active time log entry
  let timeLog = await TimeLog.findOne({ employeeId });

  if (!timeLog || !timeLog.startTime) {
    return res.status(400).json({ message: "No active timer found for this employee" });
  }

  // End the current session
  timeLog.endTime = new Date();

  // Calculate the difference between startTime and endTime in seconds
  const diffInSeconds = Math.floor((timeLog.endTime.getTime() - timeLog.startTime.getTime()) / 1000);

  // Accumulate the total time worked in this session
  timeLog.totalTimeWorkedInSeconds += diffInSeconds;

  // Convert to hours, minutes, and seconds
  const hours = Math.floor(timeLog.totalTimeWorkedInSeconds / 3600);
  const minutes = Math.floor((timeLog.totalTimeWorkedInSeconds % 3600) / 60);
  const seconds = timeLog.totalTimeWorkedInSeconds % 60;

  // Format time as HH:MM:SS
  timeLog.totalTimeWorked = [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0")
  ].join(":");

  await timeLog.save();
  res.status(200).json({
    message: "Timer stopped and time added",
    totalTimeWorked: timeLog.totalTimeWorked,
    timeLog
  });
};


// // Route to get the total time worked by an employee
exports.getAllTime = async (req, res) => {
  try {
    // Fetch all time logs for all employees
    const timeLogs = await TimeLog.find({});

    // Create an object to accumulate total time for each employee
    const totalTimePerEmployee = {};

    // Loop through each time log and accumulate the total time for each employee
    timeLogs.forEach((log) => {
      const employeeId = log.employeeId;

      if (!totalTimePerEmployee[employeeId]) {
        totalTimePerEmployee[employeeId] = 0;
      }

      // Add the time worked for this log to the total time for that employee
      totalTimePerEmployee[employeeId] += log.totalTimeWorked || 0;
    });

    // Return the total time worked for all employees
    res.status(200).json({
      totalTimeWorked: totalTimePerEmployee,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error calculating total time for all employees",
    });
  }
};

exports.newEmpTimeGet = async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    if (!employeeId) {
      return res.status(400).json({ message: "id not found" });
    }

    // Find all employees that have the same employeeId
    const employeeData = await TimeLog.find({ employeeId });

    if (!employeeData || employeeData.length === 0) {
      return res.status(404).json({ msg: "Employee time details not found" });
    }

    return res.status(200).json(employeeData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};







