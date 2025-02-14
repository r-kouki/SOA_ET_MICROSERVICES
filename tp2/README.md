# Person Registry API

A modern REST API built with Express.js and SQLite for managing person records with rate limiting and CORS support.

## Features

- CRUD operations for person management
- SQLite database for data persistence
- CORS support for cross-origin requests
- Rate limiting for API protection
- JSON response format

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository and navigate to the project directory

2. Install dependencies:
```bash
npm install
```

3. Initialize the database:
The SQLite database will be automatically created on first run.

4. Start the server:
```bash
node index.js
```

Server runs on http://localhost:3000

## Security Features

- **Rate Limiting**: 10 requests per 15 minutes per IP
- **CORS**: Configured to allow cross-origin requests
- **Input Validation**: Request body validation for data integrity

## API Documentation

### Base URL
```
http://localhost:3000
```

### Endpoints

#### 1. Get All Persons
```http
GET /personnes
```
**Response**: 
```json
{
    "message": "success",
    "data": [
        {
            "id": 1,
            "nom": "John Doe",
            "adresse": "123 Main St"
        }
    ]
}
```

#### 2. Get Person by ID
```http
GET /personnes/:id
```
**Response**: 
```json
{
    "message": "success",
    "data": {
        "id": 1,
        "nom": "John Doe",
        "adresse": "123 Main St"
    }
}
```

#### 3. Create Person
```http
POST /personnes
```
**Body**:
```json
{
    "nom": "John Doe",
    "adresse": "123 Main St"
}
```
**Response**:
```json
{
    "message": "success",
    "data": {
        "id": 1
    }
}
```

#### 4. Update Person
```http
PUT /personnes/:id
```
**Body**:
```json
{
    "nom": "Jane Doe",
    "adresse": "456 Oak St"
}
```
**Response**:
```json
{
    "message": "success"
}
```

#### 5. Delete Person
```http
DELETE /personnes/:id
```
**Response**:
```json
{
    "message": "success"
}
```

## Error Handling

All endpoints return error responses in the following format:
```json
{
    "error": "Error message description"
}
```

Common HTTP status codes:
- 200: Success
- 400: Bad Request
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Testing

### Using cURL

```bash
# Get all persons
curl http://localhost:3000/personnes

# Create a person
curl -X POST http://localhost:3000/personnes \
  -H "Content-Type: application/json" \
  -d '{"nom": "John Doe", "adresse": "123 Main St"}'

# Update a person
curl -X PUT http://localhost:3000/personnes/1 \
  -H "Content-Type: application/json" \
  -d '{"nom": "Jane Doe"}'

# Delete a person
curl -X DELETE http://localhost:3000/personnes/1
```

### Using Postman

1. Import the following endpoints into Postman:
   - GET http://localhost:3000/personnes
   - GET http://localhost:3000/personnes/:id
   - POST http://localhost:3000/personnes
   - PUT http://localhost:3000/personnes/:id
   - DELETE http://localhost:3000/personnes/:id

2. For POST/PUT requests:
   - Set Header: `Content-Type: application/json`
   - Use raw JSON body

## Dependencies

- express: Web framework
- sqlite3: Database driver
- cors: Cross-origin resource sharing
- express-rate-limit: API rate limiting

## License

ISC
