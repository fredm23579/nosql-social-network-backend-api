const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const friendRoutes = require('./friendRoutes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/friends', friendRoutes);

module.exports = router;
