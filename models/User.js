const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email format']
  },
  password: {
    type: String,
    required: true,
    minlength: 6const mongoose = require('mongoose');
    const bcrypt = require('bcryptjs');
    
    const UserSchema = new mongoose.Schema({
      username: {
        type: String,
        required: true,
        unique: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      thoughts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ],
      friends: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
    });
    
    UserSchema.pre('save', async function(next) {
      if (!this.isModified('password')) {
        return next();
      }
    
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    });
    
    module.exports = mongoose.model('User', UserSchema);
    