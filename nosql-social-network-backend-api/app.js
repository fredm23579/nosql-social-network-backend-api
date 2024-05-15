// Import necessary Node.js modules
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');

// Load environment variables from .env file into process.env
dotenv.config();

// Import middleware
const authMiddleware = require('./middleware/authMiddleware');

// Import route modules
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');
const friendRoutes = require('./routes/friendRoutes');

// Create an instance of express for your app
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('common'));

// Basic route for home page
app.get('/', (req, res) => {
    res.send('Welcome to the Social Network API');
});

// Database connection setup with mongoose
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB connected successfully.');
    } catch (err) {
        console.error('Database connection failed. Exiting now...', err);
        process.exit(1);
    }
};

// Execute the connect function to start the database connection
connectDB();

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
app.use('/api/friends', friendRoutes);

// Route that requires authentication
app.get('/private', authMiddleware, (req, res) => {
    res.send('This is a private route');
});

// Error handling middleware
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
