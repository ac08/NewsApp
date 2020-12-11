const express = require('express');
const debug = require('debug')('app:authRouter');
const passport = require('passport');

const authRouter = express.Router();
const db = require('../models');

function router(nav) {
  authRouter.route('/sign-up')
    .post((req, res) => {
      const { username, password } = req.body;
      (async function addUser() {
        try {
          const dbUser = await db.User.create({
            username,
            password
          });
          // login information stored in a cookie, deletes when server restarts
          req.login(dbUser.dataValues, () => {
            // redirect to another page to choose categories...
            res.redirect('/auth/profile');
          });
        } catch (err) {
          debug(err);
        }
      }());
    });
  authRouter.route('/sign-in')
    .get((req, res) => {
      res.render('signin', { nav });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));
  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      if (Array.isArray(req.user)) {
        const user = req.user[0];
        res.render('profile', user);
      } else {
        res.render('profile', req.user);
      }
    });
  return authRouter;
}

module.exports = router;
