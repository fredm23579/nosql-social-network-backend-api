# NoSQL Social Network Backend API

![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-v14.17.0-green)
![Express](https://img.shields.io/badge/express-v4.17.1-green)
![MongoDB](https://img.shields.io/badge/mongodb-v4.4.6-green)

## Description 

This is the backend API for a social network application built using Node.js, Express.js, and MongoDB. It provides endpoints for user authentication, managing user profiles, creating and interacting with thoughts (posts), and handling friend connections.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Directory Structure](#directory-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication using JWT
- CRUD operations for user profiles
- Create, read, update, and delete thoughts
- Add and remove reactions to thoughts
- Add and remove friends from a user's friend list

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing

## Installation

### Clone the repository

```bash
git clone https://github.com/fredm23579/nosql-social-network-backend-api.git
```

### Install the dependencies

```bash
cd nosql-social-network-backend-api
npm install
```

### Set up environment variables

Create a `.env` file in the root directory and provide the following variables:

```
MONGODB_URI=<your-mongodb-connection-url>
JWT_SECRET=<your-jwt-secret>
PORT=<port-number>
```

Replace `<your-mongodb-connection-url>`, `<your-jwt-secret>`, and `<port-number>` with your actual values.

### Start the server

```bash
npm start
```

The server will start running at `http://localhost:<port-number>`.

## Usage

You can use tools like Insomnia or Postman to test the API endpoints.

### Register a new user

Send a POST request to `/api/auth/register` with the following JSON body:

```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

### Log in with the registered user

Send a POST request to `/api/auth/login` with the following JSON body:

```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

The response will include a JWT token that you can use for authenticated requests.

Use the obtained JWT token in the `Authorization` header for subsequent requests that require authentication.

Explore the available API endpoints to interact with users, thoughts, reactions, and friends.

## API Endpoints

### Auth Routes

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Log in with a user

### User Routes

- `GET /api/users`: Get all users
- `GET /api/users/:userId`: Get a single user by ID
- `POST /api/users`: Create a new user
- `PUT /api/users/:userId`: Update a user by ID
- `DELETE /api/users/:userId`: Delete a user by ID

### Thought Routes

- `GET /api/thoughts`: Get all thoughts
- `GET /api/thoughts/:thoughtId`: Get a single thought by ID
- `POST /api/thoughts`: Create a new thought
- `PUT /api/thoughts/:thoughtId`: Update a thought by ID
- `DELETE /api/thoughts/:thoughtId`: Delete a thought by ID
- `POST /api/thoughts/:thoughtId/reactions`: Add a reaction to a thought
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction from a thought

### Friend Routes

- `POST /api/users/:userId/friends/:friendId`: Add a friend to a user's friend list
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list

## Database Models

### User Model

- `username` (String, Required, Unique, Trimmed)
- `email` (String, Required, Unique, Valid Email)
- `thoughts` (Array of ObjectId, ref: 'Thought')
- `friends` (Array of ObjectId, ref: 'User')
- `friendCount` (Virtual, Retrieves the count of friends)

### Thought Model

- `thoughtText` (String, Required, Must be between 1 and 280 characters)
- `createdAt` (Date, Default: Current timestamp, Getter to format timestamp)
- `username` (String, Required)
- `reactions` (Array of nested documents created with the reactionSchema)
- `reactionCount` (Virtual, Retrieves the count of reactions)

### Reaction Schema

- `reactionId` (ObjectId, Default: new ObjectId)
- `reactionBody` (String, Required, Maximum of 280 characters)
- `username` (String, Required)
- `createdAt` (Date, Default: Current timestamp, Getter to format timestamp)

## Directory Structure

```
nosql-social-network-backend-api/
├── config/
│   ├── db.js
│   └── index.js
├── controllers/
│   ├── authController.js
│   ├── friendController.js
│   ├── thoughtController.js
│   ├── userController.js
│   └── index.js
├── middleware/
│   ├── authMiddleware.js
├── models/
│   ├── Reaction.js
│   ├── Thought.js
│   ├── User.js
│   └── index.js
├── routes/
│   ├── authRoutes.js
│   ├── friendRoutes.js
│   ├── thoughtRoutes.js
│   ├── userRoutes.js
│   └── index.js
├── utils/
│   └── dateFormat.js
├── .env
├── .gitignore
├── app.js
├── package.json
├── README.md
├── server.js
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.