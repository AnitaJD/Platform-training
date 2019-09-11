const express = require('express');
const router = express.Router();
const { User, UsernameOfParty } = require('../models/user');

router.get('/', async function(req, res, next) {
  res.render('index');
});

module.exports = router;
