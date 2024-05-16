const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../controllers/userController');

// Route to get all users
router.get('/', getUsers);

// Route to get a single user by ID
router.get('/:id', getUserById);

// Route to create a new user
router.post('/', createUser);

// Route to update a user by ID
router.put('/:id', updateUser);

// Route to delete a user by ID
router.delete('/:id', deleteUser);

// Route to add a friend
router.post('/:userId/friends/:friendId', addFriend);

// Route to remove a friend
router.delete('/:userId/friends/:friendId', removeFriend);

module.exports = router;
