const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createThought: async (req, res) => {
    try {
      const { userId, thoughtText } = req.body;
  
      // Validate input
      if (!userId || !thoughtText) {
        return res.status(400).json({ message: 'User ID and thought text are required.' });
      }
  
      // Create the thought
      const thought = await Thought.create({ thoughtText, username: req.body.username });
  
      // Add the thought to the user's thoughts array
      const user = await User.findByIdAndUpdate(
        userId,
        { $push: { thoughts: thought._id } },
        { new: true }
      );
  
      // Check if user was found
      if (!user) {
        return res.status(404).json({ message: 'Thought created but no user found with this ID.' });
      }
  
      res.status(201).json(thought);
    } catch (err) {
      console.error(err); // Log the error for debugging purposes
      res.status(500).json({ message: 'An error occurred while creating the thought.', error: err.message });
    }
  },
  

  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addReaction: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $addToSet: { reactions: req.body } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  removeReaction: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
