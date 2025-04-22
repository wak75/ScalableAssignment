const Appointment = require('../models/Appointments');
const Doctor = require('../models/Doctor');
const {DateTime} = require('luxon');

const { slots } = require('../config/slots'); // import the global slot list

exports.createAppointment = async (req, res) => {
  try {
    const { patientName, doctor, appointmentDate, slotId, reason } = req.body;

    // Validate if the slot exists
    const slot = slots.find(s => s.id === slotId);
    if (!slot) {
      return res.status(400).json({ message: 'Invalid slot selected.' });
    }

    // Check if doctor is already booked for that date + slot
    const existingAppointment = await Appointment.findOne({
      doctor,
      appointmentDate: new Date(appointmentDate),
      slotId
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'Doctor is already booked for this slot.' });
    }

    // If free, create appointment
    const appointment = new Appointment({
      patientName,
      doctor,
      appointmentDate,
      slotId,
      reason
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment booked successfully.', appointment });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.getAppointments = async (req, res) => {
	try {
	  const appointments = await Appointment.find().populate('doctor');
	  res.json(appointments);
	} catch (error) {
	  res.status(500).json({ message: error.message });
	}
};

exports.getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Appointment.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAvailableSlots = async (req, res) => {
	try {
	  const { doctorId, date } = req.query;
  
	  if (!doctorId || !date) {
		return res.status(400).json({ message: 'doctorId and date are required.' });
	  }
  
	  const appointmentDate = new Date(date);
  
	  // Fetch the doctor information
	  const doctor = await Doctor.findById(doctorId);
	  if (!doctor) {
		return res.status(404).json({ message: 'Doctor not found.' });
	  }
  
	  // Fetch already booked slots for this doctor on this date
	  const bookedAppointments = await Appointment.find({
		doctor: doctorId,
		appointmentDate: appointmentDate
	  });
  
	  const bookedSlotIds = bookedAppointments.map(app => app.slotId);
  
	  // Filter slots which are not booked
	  const availableSlots = slots.filter(slot => !bookedSlotIds.includes(slot.id));
  
	  // Final response
	  res.status(200).json({
		doctorName: doctor.name,
		date: date,
		availableSlots: availableSlots
	  });
  
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Server error.' });
	}
  };

