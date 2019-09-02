const express = require('express');
const router = express.Router();
const { User, UsernameOfParty } = require('../models/user');

router.get('/', async function(req, res, next) {
  // let search = await UsernameOfParty.find({});
  // let arr = [];
  // for (let i = 0; i < search.length; i++) {
  //   arr.push({
  //     name: search[i].name,
  //     place: search[i].place,
  //     date: search[i].date,
  //   });
  // }
    res.render('index',{
        // arr: arr,
    });
});



module.exports = router;