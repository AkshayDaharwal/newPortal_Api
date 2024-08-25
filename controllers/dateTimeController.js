const DateTime = require('../models/dateTimeShema')

// Method to fetch all shifts or a specific shift by ID
exports.getShifts = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            // Fetch a specific shift by ID
            const shift = await DateTime.findById(id);

            if (!shift) {
                return res.status(404).json({ message: 'Shift not found' });
            }
            res.json(shift);
        } else {
            // Fetch all shifts
            const shifts = await DateTime.find();
            res.json(shifts);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.startShift = async (req, res) => {
    try {
        const currentDateTime = new Date();

        // Save the current date and time as the start time to the database
        const newDateTime = new DateTime({ startAt: currentDateTime });
        await newDateTime.save();

        res.json({
            message: 'Shift started',
            startAt: currentDateTime
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Method to end a shift (record end time)
exports.endShift = async (req, res) => {
    
    try {
        const { id } = req.params;
        const currentDateTime = new Date();

        // Find the entry by ID and update the end time
        const dateTime = await DateTime.findByIdAndUpdate(id, { endAt: currentDateTime }, { new: true });

        if (!dateTime) {
            return res.status(404).json({ message: 'Shift not found' });
        }

        res.json({
            message: 'Shift ended',
            startAt: dateTime.startAt,
            endAt: currentDateTime
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.startBreak = async (req, res) =>{
        try {
            const {id} = req.params ;
            const currentDateTime = new Date();

            const dateTime = await DateTime.findByIdAndUpdate (id, {breakStart : currentDateTime}, {new : true})

            if(!dateTime){
                return res.status(404).json({message : "Start break not found !"})
            }

            return res.status(200).json({
                message : "Break started",
                breakStart : currentDateTime 
            })

        } catch (error) {
            return res.status(500).json({message : error.message})
        }
}

exports.endBreak = async (req,res) =>{
        try {
            const {id} = req.params;
            const currentDateTime = new Date();

            const dateTime = await DateTime.findByIdAndUpdate(id,{endBreak: currentDateTime}, {new : true})
            
            if(!dateTime){
                return res.status(500).json({message : "end Break not found !"})
            }
            return res.status(200).json({ message: "end Break successfuly", endBreak : currentDateTime})
        } catch (error) {
            return res.status(500).json({ message : error.message})
        }
}










