const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  doctor: {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'Doctor',
	required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled'],
    default: 'Scheduled',
  },
  slotId: {
    type: Number,  // slot id from slots list
    required: true
  },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
