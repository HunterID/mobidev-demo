const route = require('express').Router();

const friendsController = require('../controllers/friends');

route.get('/friendsCount', friendsController.getFriendsCount);

module.exports = route;
