# Car Companies API

A simple REST API that provides information about car manufacturers and their models. This API serves data about 74 different car brands with their respective model lineups.

## Features

- **Complete car brand database**: Information about 74+ car manufacturers
- **Model listings**: Each brand includes a comprehensive list of available models
- **RESTful endpoints**: Clean and simple API design
- **CORS enabled**: Ready for frontend integration
- **JSON responses**: Easy to consume data format

## API Endpoints

### Base URL
```
http://localhost:3000
```

### Available Endpoints

#### 1. Welcome Message
- **GET** `/`
- **Description**: Returns a welcome message
- **Response**: `"Welcome to the Car Brands API!"`

#### 2. Get All Car Makers
- **GET** `/makers`
- **Description**: Returns a complete list of all car manufacturers
- **Response**: Array of car maker objects with id, brand, logo_url, and models

#### 3. Get Specific Car Maker
- **GET** `/makers/:id`
- **Description**: Returns information about a specific car manufacturer by ID
- **Parameters**: 
  - `id` (integer): The ID of the car maker
- **Response**: Single car maker object or 404 error if not found

## Example Usage

### Get all car makers
```bash
curl http://localhost:3000/makers
```

### Get specific car maker (BMW)
```bash
curl http://localhost:3000/makers/8
```

### Response Format

```json
{
  "id": 8,
  "brand": "BMW",
  "logo_url": "",
  "models": [
    "1 Series (All)",
    "114",
    "116",
    "118",
    "120",
    // ... more models
  ]
}
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd car-companies-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000` (or the port specified in the PORT environment variable).

## Dependencies

- **Express.js** (^5.1.0): Web framework for Node.js
- **CORS** (^2.8.5): Cross-Origin Resource Sharing middleware

## Project Structure

```
car-companies-api/
├── index.js          # Main server file
├── carData.json      # Car manufacturers and models data
├── package.json      # Project dependencies and scripts
├── .gitignore        # Git ignore file
└── README.md         # This file
```

## Data Structure

Each car maker object contains:
- `id`: Unique identifier
- `brand`: Brand name
- `logo_url`: URL for brand logo (currently empty)
- `models`: Array of model names for the brand

## Available Car Brands

The API includes data for major car manufacturers such as:
- Audi, BMW, Mercedes-Benz, Volkswagen
- Ford, Chevrolet, Cadillac, Lincoln
- Toyota, Honda, Nissan, Mazda
- Ferrari, Lamborghini, Porsche, McLaren
- Tesla, BYD, Polestar
- And many more...

## Development

To run the development server:

```bash
npm start
```

The server will automatically restart when you make changes to the code.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For questions or issues, please open an issue in the repository.
