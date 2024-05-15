const Thought = require('../models/Thought');
const User = require('../models/User');

const getAllThoughts = async () => {
    try {
        return await Thought.find().sort({ createdAt: -1 });
    } catch (error) {
        console.error('Error fetching thoughts:', error);
        throw new Error('Failed to retrieve thoughts.');
    }
};

const getThoughtById = async (thoughtId) => {
    try {
        return await Thought.findById(thoughtId);
    } catch (error) {
        console.error('Error fetching thought:', error);
        throw new Error('Failed to retrieve the thought.');
    }
};

const createThought = async ({ text, userId }) => {
    try {
        const thought = await Thought.create({ text, userId });
        await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });
        return thought;
    } catch (error) {
        console.error('Error creating thought:', error);
        throw new Error('Failed to create thought.');
    }
};

const updateThought = async (thoughtId, thoughtUpdates) => {
    try {
        return await Thought.findByIdAndUpdate(thoughtId, thoughtUpdates, { new: true, runValidators: true });
    } catch (error) {
        console.error('Error updating thought:', error);
        throw new Error('Failed to update thought.');
    }
};

const deleteThought = async (thoughtId) => {
    try {
        const thought = await Thought.findByIdAndDelete(thoughtId);
        if (thought) {
            await User.findByIdAndUpdate(thought.userId, { $pull: { thoughts: thought._id } });
        }
        return thought;
    } catch (error) {
        console.error('Error deleting thought:', error);
        throw new Error('Failed to delete thought.');
    }
};

const addReaction = async (thoughtId, reactionData) => {
    try {
        return await Thought.findByIdAndUpdate(thoughtId, { $push: { reactions: reactionData } }, { new: true, runValidators: true });
    } catch (error) {
        console.error('Error adding reaction:', error);
        throw new Error('Failed to add reaction.');
    }
};

const removeReaction = async (thoughtId, reactionId) => {
    try {
        return await Thought.findByIdAndUpdate(thoughtId, { $pull: { reactions: { reactionId } } }, { new: true });
    } catch (error) {
        console.error('Error removing reaction:', error);
        throw new Error('Failed to remove reaction.');
    }
};

module.exports = {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
};
