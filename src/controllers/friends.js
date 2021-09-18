const STATUS_CODES = require('../common/constans');
const friendsService = require('../services/friends');

async function getFriendsCount(req, res) {
  const users = await friendsService.getFriendsCount();

  res.send(users).status(STATUS_CODES.OK);
}

module.exports = { getFriendsCount };
