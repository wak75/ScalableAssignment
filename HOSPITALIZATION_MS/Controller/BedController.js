const Hospital = require('../Model/Hospital');

// Get all hospital bed availability
exports.getAllBedAvailability = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    const result = hospitals.map(h => ({
      id: h._id,
      name: h.name,
      availableBeds: h.totalBeds - h.occupiedBeds
    }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get specific hospital bed availability
exports.getBedAvailabilityById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });

    res.json({
      id: hospital._id,
      name: hospital.name,
      availableBeds: hospital.totalBeds - hospital.occupiedBeds
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get specific hospital Name
exports.getHospitalByName = async (req, res) => {
    try{
    const name = req.params.name;
    // Case-insensitive search
    const hospital = await Hospital.findOne({ name: new RegExp(`^${name}$`, 'i') });
  
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
  
    res.json({
      id: hospital._id,
      name: hospital.name,
      totalBeds: hospital.totalBeds,
      occupiedBeds: hospital.occupiedBeds,
      availableBeds: hospital.totalBeds - hospital.occupiedBeds
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
  };


// Update bed counts
exports.updateBedCounts = async (req, res) => {
  const { totalBeds, occupiedBeds } = req.body;

  try {
    const hospital = await Hospital.findById(req.params.id);
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });

    if (totalBeds !== undefined) hospital.totalBeds = totalBeds;
    if (occupiedBeds !== undefined) hospital.occupiedBeds = occupiedBeds;

    await hospital.save();

    res.json({
      message: 'Hospital bed data updated',
      data: hospital
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
