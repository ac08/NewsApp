const express = require('express');
const debug = require('debug')('app:indexRouter');

const indexRouter = express.Router();

// Routes
// =============================================================
function router(nav) {
  indexRouter.route('/')
    .get((req, res) => {
      debug(req);
      res.render('index', { nav });
    });
  return indexRouter;
}

module.exports = router;
