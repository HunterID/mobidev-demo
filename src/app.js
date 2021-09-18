require('dotenv').config()
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyPaser = require('body-parser');

const app = express();

const followersRoute = require('./routes/followers');
const friendsRoute = require('./routes/friends');

const dbConnect = require('../src/db/dbConnect');

dbConnect();

app.use(helmet());
app.use(cors());
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(bodyPaser.json());
app.use('/', followersRoute, friendsRoute);

module.exports = app;
