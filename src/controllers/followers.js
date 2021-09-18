const STATUS_CODES = require('../common/constans');
const followersService = require('../services/followers');

async function getTopFollowers(req, res) {
  const topFollowers = await followersService.getTopFollowers();

  res.send(topFollowers).status(STATUS_CODES.OK);
}

module.exports = { getTopFollowers };
