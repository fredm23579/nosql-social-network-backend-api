const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('MongoDB connected successfully.');
    } catch (err) {
        console.error('Database connection failed. Exiting now...', err);
        process.exit(1);
    }
};

module.exports = connectDB;
