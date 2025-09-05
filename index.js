// 1. Import required modules
const express = require('express');
const cors = require('cors');
const path = require('path');

// 2. Create an Express app and define the port
const app = express();
const PORT = process.env.PORT || 3000;

// 3. Import the car data from the JSON file
const carData = require('./carData.json');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// 5. Define API endpoints (Routes)
// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Car Brands API!');
});

// GET /makers/random - returns a single random car maker (must be before /makers/:brand)
app.get('/makers/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * carData.length);
  const randomMaker = carData[randomIndex];
  res.json(randomMaker);
});

// COMBINED ENDPOINT FOR /makers WITH SEARCH AND PAGINATION
app.get('/makers', (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  
  let results = [...carData]; // Start with a copy of the full dataset

  // Step 1: Apply search filter if a query is provided
  if (search) {
    results = results.filter(maker => 
      maker.brand.toLowerCase().includes(search.toString().toLowerCase())
    );
  }

  // Step 2: Apply pagination to the (potentially filtered) results
  const paginatedResults = {};
  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = parseInt(page) * parseInt(limit);
  
  paginatedResults.totalItems = results.length;
  paginatedResults.totalPages = Math.ceil(results.length / parseInt(limit));
  paginatedResults.currentPage = parseInt(page);
  paginatedResults.data = results.slice(startIndex, endIndex);

  res.json(paginatedResults);
});

// GET /makers/:brand - returns a single maker by brand name
app.get('/makers/:brand', (req, res) => {
  const brandName = decodeURIComponent(req.params.brand);
  const maker = carData.find(m => 
    m.brand.toLowerCase() === brandName.toLowerCase()
  );

  if (maker) {
    res.json(maker);
  } else {
    res.status(404).json({ error: 'Maker not found' });
  }
});

// GET /makers/:brand/logo - returns logo for a specific brand
app.get('/makers/:brand/logo', (req, res) => {
  const brandName = decodeURIComponent(req.params.brand);
  const maker = carData.find(m => 
    m.brand.toLowerCase() === brandName.toLowerCase()
  );
  if (maker && maker.logo_url) {
    res.redirect(maker.logo_url);
  } else {
    res.status(404).json({ error: 'Maker or logo not found' });
  }
});

// 6. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});