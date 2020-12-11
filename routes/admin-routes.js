const express = require('express');
const debug = require('debug')('app:adminRouter');

const db = require('../models');

const adminRouter = express.Router();

function router(nav) {
  adminRouter.route('/categories')
    .get(async (req, res) => {
      const dbCategories = await db.Category.findAll({
        attributes: ['id', 'category']
      });
      debug(req.user);
      res.render('categories', { nav, dbCategories });
    });
  return adminRouter;
}

module.exports = router;
