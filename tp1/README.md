# TP1 - API Consumption Examples

This project demonstrates different methods of consuming various APIs using Node.js with different HTTP clients.

## Project Structure

- `index.js` - Weather API implementation using the `request` package
- `fetch.js` - Weather API implementation using native `fetch`
- `axios.js` - Weather API implementation using `axios`
- `nasa.js` - NASA Near Earth Objects API implementation
- `book.js` - Open Library API implementation
- `random.js` - Random User API implementation

## Prerequisites

- Node.js installed
- NPM package manager

## Installation

```bash
npm install
```

## API Examples

### Weather API
Three different implementations of the OpenWeatherMap API:
- Using request: `node index.js`
- Using fetch: `node fetch.js`
- Using axios: `node axios.js`

### NASA API
Fetches near-earth objects data:
```bash
node nasa.js
```

### Open Library API
Retrieves books by subject:
```bash
node book.js
```

### Random User API
Fetches and displays random user data:
```bash
node random.js
```

## Environment Variables
You'll need the following API keys:
- OpenWeatherMap API key
- NASA API key

## Dependencies

- axios: HTTP client
- request: HTTP client (deprecated but still functional)
- node-fetch: Fetch API implementation for Node.js

## Implementation Details

### Weather API Implementations

#### Request Implementation (`index.js`)
- Uses the callback-based `request` package
- Demonstrates traditional Node.js callback pattern
- Includes error handling with try/catch
- Makes GET request to OpenWeatherMap API
- Formats and displays temperature, humidity, and weather description

#### Fetch Implementation (`fetch.js`)
- Uses native `fetch` API (Node.js 18+)
- Demonstrates modern Promise-based approach
- Uses async/await syntax
- Implements error handling with try/catch
- Shows how to handle JSON responses
- Includes response status validation

#### Axios Implementation (`axios.js`)
- Uses the Promise-based `axios` library
- Demonstrates automatic JSON parsing
- Implements interceptors for request/response handling
- Shows how to set default headers and base URL
- Includes comprehensive error handling

### NASA API Implementation (`nasa.js`)
- Fetches Near Earth Object data from NASA's API
- Implements date-based queries
- Processes and filters asteroid data
- Calculates close approach distances
- Displays hazardous asteroid warnings

### Open Library Implementation (`book.js`)
- Searches books by subject
- Implements pagination
- Extracts author, title, and publication info
- Shows how to handle complex JSON responses
- Includes result sorting and filtering

### Random User Implementation (`random.js`)
- Fetches random user profiles
- Demonstrates data transformation
- Implements result filtering
- Shows how to extract specific user fields
- Includes nationality and gender filtering options

## API Credits

- OpenWeatherMap: https://openweathermap.org/api
- NASA API: https://api.nasa.gov/
- Open Library: https://openlibrary.org/developers/api
- Random User: https://randomuser.me/
