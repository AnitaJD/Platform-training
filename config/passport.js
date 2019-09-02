const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcrypt');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(function(username, password, done) {
      let query = { username: username };
      User.findOne(query, function(err, user) {
        if (err) {
          throw err;
        }
        if (!user) {
          return done(null, false, { message: 'Пользователь не найден' });
        }
        bcrypt.compare(password, user.password, function(err, isMatch) {
          if (err) {
            throw err;
          }
          if (isMatch) {
            return done(null, user);
          } else {
            console.log('Неверный пароль');
            return done(null, false, { message: 'Пароль введен неверно' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
