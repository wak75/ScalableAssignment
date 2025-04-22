const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalBeds: { type: Number, required: true },
  occupiedBeds: { type: Number, required: true }
});

module.exports = mongoose.model('Hospital', HospitalSchema);
