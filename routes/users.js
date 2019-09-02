const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, UserProfile } = require('../models/user');

// Форма регистрации
router.get('/register', function(req, res) {
  res.render('register');
});

// Процесс регистрации + шифрование
router.post('/register', function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  let newUser = new User({
    name: name,
    email: email,
    username: username,
    password: password
  });

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      if (err) {
        console.log(err);
      }
      newUser.password = hash;
      newUser.save(function(err) {
        if (err) {
          console.log(err);
          return;
        } else {
          req.flash('success', 'Вы зарегистрированы и теперь можете войти');
          res.redirect('/users/login');
        }
      });
    });
  });
});

router.get('/login', function(req, res) {
  res.render('login');
});

// вход
router.post('/login', function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/users/themes',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// выход
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'Вы вышли');
  res.redirect('/users/login');
});


router.get('/contacts', function(req, res) {
  res.render('contacts');
});

router.get('/profile', async function(req, res) {
  let user = await User.findOne({id: req.session.user});
  // console.log(user.name);
  const newProfile = new UserProfile({
    idUser: user.id,
    name: user.name,
    email: user.email,
    place: user.place,
    photo: user.photo,
    group: user.group,
  });
  // console.log(newProfile)
  await newProfile.save();
  res.render('profile',{
    name: user.name,
    email: user.email,
    place: user.place,
    photo: user.photo,
    group: user.group,
  }); 
});

router.get('/themes', function(req, res) {
  res.render('themes');
});

router.get('/messages', function(req, res) {
  res.render('messages');
});

router.get('/group', function(req, res) {
  res.render('group');
});

// router.post('/profile', function(req, res) {
//   const idUser = req.user._id;
//   const name = req.body.name;
//   const email = req.body.email;
//   const photo = req.body.photo;
//   const group = req.user.group;

//   let newParty = new User({
//     idUser: idUser,
//     name: name,
//     email: email,
//     photo: photo,
//     group: group,
//   });

//   newParty.save(function(err) {
//     if (err) {
//       console.log(err);
//       return;
//     } else {
//       req.flash('success', 'Ok');
//       res.redirect('/users/event');
//     }
//   });
// });

// router.get('/event', async function(req, res) {
//   let search = await UsernameOfParty.find({});
//   let arr = [];
//   for (let i = 0; i < search.length; i++) {
//     arr.push({
//       name: search[i].name,
//       place: search[i].place,
//       date: search[i].date,
//       host: search[i].host,
//     });
//   }
//   res.render('event', {
//     arr: arr,
//   });
// });

module.exports = router;
