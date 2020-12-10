const express = require('express');

const debug = require('debug')('app');

const authRouter = express.Router();
// const db = require('../models');

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
      res.json(req.body);
    });
  return authRouter;
}

module.exports = router;
