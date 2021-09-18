const route = require('express').Router();

const { getTopFollowers } = require('../controllers/followers');

route.get('/popular', getTopFollowers);

module.exports = route;
