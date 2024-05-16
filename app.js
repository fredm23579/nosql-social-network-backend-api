const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

// Initialize dotenv to load environment variables from .env file into process.env
dotenv.config();

// Create an instance of express for your app and configure bodyParser middleware
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection setup with mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error('Database connection failed. Exiting now...', err);
    process.exit(1);
  }
};

// Execute the connect function to start the database connection
connectDB();

// Use auth routes
app.use('/api/auth', authRoutes);

// Basic Route for Home Page
app.get('/', (req, res) => {
  res.send('Welcome to the Social Network API');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Define the PORT and start listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the Express app for testing purposes
module.exports = app;
