
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Vehicle Schema
const vehicleSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: Number
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// Home Route
app.get('/', (req, res) => {
  res.send('AutoMart Backend is running successfully!');
});

// Get All Vehicles
app.get('/api/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully!');

    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch((error) => {
    console.error('MongoDB Connection Error:', error.message);
  });
