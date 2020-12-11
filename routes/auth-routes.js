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
          debug(dbUser.dataValues);
          req.login(dbUser.dataValues, () => {
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
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
