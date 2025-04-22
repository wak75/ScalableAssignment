const express = require('express');
const router = express.Router();
const bedController = require('../Controller/BedController');

router.get('/beds', bedController.getAllBedAvailability);
router.get('/beds/name/:name', bedController.getHospitalByName);
router.get('/beds/:id', bedController.getBedAvailabilityById);
router.put('/beds/:id', bedController.updateBedCounts); // New route

module.exports = router;
