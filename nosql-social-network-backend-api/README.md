# NoSQL Social Network Backend API

This is the backend API for a social network application built using Node.js, Express.js, and MongoDB. It provides endpoints for user authentication, managing user profiles, creating and interacting with thoughts (posts), and handling friend connections.

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

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in a `.env` file:
   - `MONGODB_URI`: MongoDB connection URL
   - `JWT_SECRET`: Secret key for JWT signing
4. Start the server: `npm start`

## API Endpoints

- `/api/auth/register`: User registration
- `/api/auth/login`: User login
- `/api/users`: CRUD operations for user profiles
- `/api/thoughts`: CRUD operations for thoughts
- `/api/thoughts/:thoughtId/reactions`: Add and remove reactions to thoughts
- `/api/users/:userId/friends/:friendId`: Add and remove friends from a user's friend list

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).