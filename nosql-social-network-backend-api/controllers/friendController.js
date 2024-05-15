const User = require('../models/User');

const addFriend = async (userId, friendId) => {
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } },
            { new: true }
        ).populate('friends');

        if (!user) {
            return { success: false, message: 'User not found.' };
        }

        return { success: true, details: user };
    } catch (error) {
        console.error('Error adding friend:', error);
        return { success: false, message: 'Failed to add friend.' };
    }
};

const removeFriend = async (userId, friendId) => {
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } },
            { new: true }
        ).populate('friends');

        if (!user) {
            return { success: false, message: 'User not found.' };
        }

        return { success: true, details: user };
    } catch (error) {
        console.error('Error removing friend:', error);
        return { success: false, message: 'Failed to remove friend.' };
    }
};

module.exports = {
    addFriend,
    removeFriend,
};
