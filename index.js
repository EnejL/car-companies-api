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

// 4. A reusable helper function for creating standardized error responses
const createErrorResponse = (message, statusCode = 400) => {
  return {
    error: true,
    statusCode: statusCode,
    message: message
  };
};

// 5. Define API endpoints (Routes)

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Car Brands API!');
});

// GET /makers/random MUST be defined before /makers/:brand to avoid conflicts
app.get('/makers/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * carData.length);
  res.json(carData[randomIndex]);
});

// A SINGLE, COMBINED ENDPOINT FOR /makers WITH VALIDATION, SEARCH, AND PAGINATION
app.get('/makers', (req, res) => {
  const { search, page, limit } = req.query;
  
  // Use default values if page or limit are not provided
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;
  
  // VALIDATION for page and limit parameters
  if (pageNum < 1) {
    return res.status(400).json(createErrorResponse('Invalid query: page must be a positive integer.'));
  }
  if (limitNum < 1) {
    return res.status(400).json(createErrorResponse('Invalid query: limit must be a positive integer.'));
  }

  let results = [...carData]; // Start with the full dataset

  // Step 1: Apply search filter if a query is provided
  if (search) {
    results = results.filter(maker => 
      maker.brand.toLowerCase().includes(search.toString().toLowerCase())
    );
    
    // GRACEFUL HANDLING for a search that returns no results
    if (results.length === 0) {
      return res.status(404).json(createErrorResponse(`No car brands found matching "${search}".`, 404));
    }
  }

  // Step 2: Apply pagination to the (potentially filtered) results
  const totalItems = results.length;
  const totalPages = Math.ceil(totalItems / limitNum);

  // VALIDATION to prevent requesting a page that doesn't exist
  if (pageNum > totalPages && totalItems > 0) {
     return res.status(400).json(createErrorResponse(`Invalid query: page ${pageNum} does not exist. Maximum pages: ${totalPages}.`));
  }
  
  const startIndex = (pageNum - 1) * limitNum;
  const paginatedData = results.slice(startIndex, startIndex + limitNum);

  res.json({
    totalItems: totalItems,
    totalPages: totalPages,
    currentPage: pageNum,
    data: paginatedData
  });
});

// GET /makers/:brand - returns a single maker by brand name
app.get('/makers/:brand', (req, res) => {
  const brandName = req.params.brand.toLowerCase();
  const maker = carData.find(m => m.brand.toLowerCase() === brandName);

  if (maker) {
    res.json(maker);
  } else {
    res.status(404).json(createErrorResponse(`Maker "${req.params.brand}" not found.`, 404));
  }
});

// GET /makers/:brand/logo - returns logo for a specific brand
app.get('/makers/:brand/logo', (req, res) => {
  const brandName = req.params.brand.toLowerCase();
  const maker = carData.find(m => m.brand.toLowerCase() === brandName);

  if (maker && maker.logo_url) {
    res.redirect(maker.logo_url);
  } else {
    res.status(404).json(createErrorResponse(`Logo for maker "${req.params.brand}" not found.`, 404));
  }
});


// 6. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});