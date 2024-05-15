module.exports = {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-api',
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/social-network-api',
    DATABASE_NAME: process.env.DATABASE_NAME || 'social-network-api',
    DATABASE_PORT: process.env.DATABASE_PORT || 27017
};
