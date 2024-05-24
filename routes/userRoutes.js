const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users
// @access  Private
router.get('/', auth, userController.getAllUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', auth, userController.getUserById);

// @route   POST /api/users
// @desc    Create a user
// @access  Public
router.post(
  '/',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required with 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    userController.createUser(req, res);
  }
);

// @route   PUT /api/users/:id
// @desc    Update a user
// @access  Private
router.put('/:id', auth, userController.updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete a user
// @access  Private
router.delete('/:id', auth, userController.deleteUser);

module.exports = router;
