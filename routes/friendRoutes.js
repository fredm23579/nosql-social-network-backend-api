const router = require('express').Router();
const {
  addFriend,
  removeFriend
} = require('../controllers/friendController');

router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
