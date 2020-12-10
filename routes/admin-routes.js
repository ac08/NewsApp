const express = require('express');
const debug = require('debug')('app:adminRouter');

const db = require('../models');

const adminRouter = express.Router();

function router(nav) {
  adminRouter.route('/')
    .get(async (req, res, next) => {
      const dbCategories = await db.Category.findAll({
        attributes: ['id', 'category']
      });
      if (dbCategories.length > 1) {
        res.render('categories', { dbCategories });
      } else next();
    })
    .get(async (req, res) => {
      const dbCategories = await db.Category.bulkCreate([
        { category: 'Business' },
        { category: 'Entertainment' },
        { category: 'General' },
        { category: 'Health' },
        { category: 'Science' },
        { category: 'Sports' },
        { category: 'Technology' }
      ]);
      debug('rendered categories');
      res.render('categories', { nav, dbCategories });
    });
  return adminRouter;
}

module.exports = router;
