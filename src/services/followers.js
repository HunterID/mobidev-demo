const Users = require('../db/model/users');

const MAX_POPULAR_USERS = 3;

async function getTopFollowers() {
  return Users.aggregate([
    { $project: { id: '$_id', _id: 0, surname: 1, name: 1, birthday: 1, followersCount: { $size: '$followers' } } },
    { $sort: { followersCount: -1 } },
    { $limit: MAX_POPULAR_USERS },
  ]);
}

module.exports = { getTopFollowers };
