const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../models/User');
const Thought = require('../models/Thought');

// Load environment variables from .env file
require('dotenv').config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create sample users
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = new User({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(), // Add password to match User schema
      });
      users.push(user);
    }
    await User.insertMany(users);

    // Create sample thoughts
    const thoughts = [];
    for (let i = 0; i < 20; i++) {
      const thought = new Thought({
        thoughtText: faker.lorem.sentence(),
        username: faker.random.arrayElement(users).username,
      });
      thoughts.push(thought);
    }
    await Thought.insertMany(thoughts);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
