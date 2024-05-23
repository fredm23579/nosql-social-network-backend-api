const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply the authMiddleware to protect the routes
router.route('/')
  .get(authMiddleware, getUsers)
  .post(authMiddleware, createUser);

router.route('/:id')
  .get(authMiddleware, getUser)
  .put(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser);

module.exports = router;
