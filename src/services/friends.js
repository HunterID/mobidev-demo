const Users = require('../db/model/users');

async function getFriendsCount() {
  return Users.aggregate([
    { $project: { id: '$_id', _id: 0, friendsCount: { $size: '$friends' } } },
  ]);
}

module.exports = { getFriendsCount };
