const User = require('../models/User');

module.exports = {
  addFriend: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      ).populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  removeFriend: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      ).populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
