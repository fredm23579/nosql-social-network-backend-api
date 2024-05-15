const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { addFriend, removeFriend } = require('../controllers/friendController');

router.post('/:userId/friends/:friendId', authMiddleware, async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const result = await addFriend(userId, friendId);
        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }
        res.status(200).json({ message: 'Friend added successfully.', details: result.details });
    } catch (error) {
        console.error('Error adding friend:', error);
        res.status(500).json({ message: 'Failed to add friend.' });
    }
});

router.delete('/:userId/friends/:friendId', authMiddleware, async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const result = await removeFriend(userId, friendId);
        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }
        res.status(200).json({ message: 'Friend removed successfully.', details: result.details });
    } catch (error) {
        console.error('Error removing friend:', error);
        res.status(500).json({ message: 'Failed to remove friend.' });
    }
});

module.exports = router;
