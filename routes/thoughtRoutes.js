const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../controllers/thoughtController');

router.get('/', async (req, res) => {
    try {
        const thoughts = await getAllThoughts();
        res.status(200).json(thoughts);
    } catch (error) {
        console.error('Error getting all thoughts:', error);
        res.status(500).json({ message: 'Failed to retrieve thoughts.' });
    }
});

router.get('/:thoughtId', async (req, res) => {
    try {
        const thought = await getThoughtById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found.' });
        }
        res.status(200).json(thought);
    } catch (error) {
        console.error('Error getting thought by ID:', error);
        res.status(500).json({ message: 'Failed to retrieve thought.' });
    }
});

router.post('/', authMiddleware, async (req, res) => {
    try {
        const thought = await createThought(req.body);
        res.status(201).json(thought);
    } catch (error) {
        console.error('Error creating thought:', error);
        res.status(500).json({ message: 'Failed to create thought.' });
    }
});

router.put('/:thoughtId', authMiddleware, async (req, res) => {
    try {
        const updatedThought = await updateThought(req.params.thoughtId, req.body);
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found.' });
        }
        res.status(200).json(updatedThought);
    } catch (error) {
        console.error('Error updating thought:', error);
        res.status(500).json({ message: 'Failed to update thought.' });
    }
});

router.delete('/:thoughtId', authMiddleware, async (req, res) => {
    try {
        const deletedThought = await deleteThought(req.params.thoughtId);
        if (!deletedThought) {
            return res.status(404).json({ message: 'Thought not found.' });
        }
        res.status(200).json({ message: 'Thought deleted successfully.', deletedThought });
    } catch (error) {
        console.error('Error deleting thought:', error);
        res.status(500).json({ message: 'Failed to delete thought.' });
    }
});

router.post('/:thoughtId/reactions', authMiddleware, async (req, res) => {
    try {
        const updatedThought = await addReaction(req.params.thoughtId, req.body);
        res.status(201).json(updatedThought);
    } catch (error) {
        console.error('Error adding reaction:', error);
        res.status(500).json({ message: 'Failed to add reaction.' });
    }
});

router.delete('/:thoughtId/reactions/:reactionId', authMiddleware, async (req, res) => {
    try {
        const updatedThought = await removeReaction(req.params.thoughtId, req.params.reactionId);
        res.status(200).json(updatedThought);
    } catch (error) {
        console.error('Error removing reaction:', error);
        res.status(500).json({ message: 'Failed to remove reaction.' });
    }
});

module.exports = router;
