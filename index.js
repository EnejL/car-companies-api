// 1. Import required modules
const express = require('express');
const cors = require('cors');
const path = require('path');

// 2. Create an Express app and define the port
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// 3. Import the car data from the JSON file
const carData = require('./carData.json');

// 4. Apply middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
// Serve static files (like logos) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// 5. Define API endpoints (Routes)

// Root endpoint - a simple welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the Car Brands API!');
});

// GET /makers - returns the full list of car makers
app.get('/makers', (req, res) => {
  res.json(carData);
});

// GET /makers/:id - returns a single maker by its ID
app.get('/makers/:id', (req, res) => {
  const makerId = parseInt(req.params.id); // Get the ID from the URL parameter
  const maker = carData.find(m => m.id === makerId);

  if (maker) {
    res.json(maker);
  } else {
    // If no maker is found, send a 404 Not Found error
    res.status(404).json({ error: 'Maker not found' });
  }
});

// 6. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});