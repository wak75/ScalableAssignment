const express = require('express');
const connectDB = require('./db');
const appointmentRoutes = require('./routes/appointmentRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json());

// Routes
app.use('/appointments', appointmentRoutes);
app.use('/doctors', doctorRoutes);

// Start server
app.listen(port, () => {
  console.log(`Doctor Appointment Service running on port ${port}`);
});
