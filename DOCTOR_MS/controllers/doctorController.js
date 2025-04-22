const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointments');
const { slots } = require('../config/slots'); // import the global slot list


exports.createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDoctorSchedule = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    if (!doctorId || !date) {
      return res.status(400).json({ message: 'doctorId and date are required.' });
    }

    const appointmentDate = new Date(date);

    // Fetch doctor
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found.' });
    }

    // Fetch appointments for this doctor on this date
    const appointments = await Appointment.find({
      doctor: doctorId,
      appointmentDate: appointmentDate
    });

    // Create a map of slotId -> patientName
    const bookedSlotsMap = {};
    appointments.forEach(app => {
      bookedSlotsMap[app.slotId] = app.patientName;
    });

    // Prepare final slot list
    const slotStatus = slots.map(slot => ({
      id: slot.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      status: bookedSlotsMap[slot.id] ? "Booked" : "Available",
      patientName: bookedSlotsMap[slot.id] || null
    }));


    // Send response
    res.status(200).json({
      doctorName: doctor.name,
      date: date,
      slots: slotStatus
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
