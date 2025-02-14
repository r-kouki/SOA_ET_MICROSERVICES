# Person Registry API

A simple REST API built with Express.js and SQLite for managing person records.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
node index.js
```

The server will run on port 3000 by default.

## Database Structure

The SQLite database contains a `personnes` table with the following structure:
- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `nom` (TEXT NOT NULL)
- `adresse` (TEXT)

## API Endpoints

### Get All Persons
- **Method**: GET
- **URL**: `/personnes`
- **Response**: List of all persons

### Get Person by ID
- **Method**: GET
- **URL**: `/personnes/:id`
- **Response**: Single person object

### Create Person
- **Method**: POST
- **URL**: `/personnes`
- **Body**:
```json
{
    "nom": "John Doe",
    "adresse": "123 Main St"
}
```

### Update Person
- **Method**: PUT
- **URL**: `/personnes/:id`
- **Body**:
```json
{
    "nom": "Jane Doe"
}
```

### Delete Person
- **Method**: DELETE
- **URL**: `/personnes/:id`

## Testing with Postman

1. **Start the server**
2. **Open Postman**
3. **Test endpoints**:

For POST/PUT requests, set:
- Header: `Content-Type: application/json`
- Body: raw JSON

Example requests:
```bash
# Get all persons
GET http://localhost:3000/personnes

# Get person by ID
GET http://localhost:3000/personnes/1

# Create person
POST http://localhost:3000/personnes
{
    "nom": "John Doe",
    "adresse": "123 Main St"
}

# Update person
PUT http://localhost:3000/personnes/1
{
    "nom": "Jane Doe"
}

# Delete person
DELETE http://localhost:3000/personnes/1
```

## Dependencies

- express: ^4.21.2
- sqlite3: ^5.1.7
