const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('app:local.strategy');

const db = require('../../models');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {
      (async function addUser() {
        try {
          const dbUser = await db.User.findAll({
            where: { username }
          });
          if (dbUser[0].dataValues.password === password) {
            done(null, dbUser);
          } else {
            done(null, false);
          }
        } catch (err) {
          debug(err);
        }
      }());
    }
  ));
};
