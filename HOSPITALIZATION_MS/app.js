const express = require('express');
const connectDB = require('./config/db');
const bedRoutes = require('./Routes/BedRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json()); // To parse JSON bodies
app.use('/api', bedRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
